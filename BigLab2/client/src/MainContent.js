import { Row, Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import Sidebar from './Sidebar.js';
import TaskList from './TaskList.js';
import AddTaskForm from './AddTaskForm.js';
import EditTaskForm from './EditTaskForm.js';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Route, Switch } from 'react-router';
import { loadAllTasks } from './API.js';

function MainContent(props) {
    const [tasks, setTasks] = useState(null);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [taskName, setTaskName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [update, setUpdate] = useState(true);


    const deleteTask = (description) => {
        setTasks((oldTasks) => oldTasks.filter(t => t.description !== description));
    };

    const addTask = (task) => {
        setTasks(oldTasks => [...oldTasks, task]);
    };

    const updateTask = (task) => {
        setTasks(oldTasks => [...oldTasks.filter(t => t.description !== task.description), task]);
    }


    useEffect(() => {
        if (update) {
            async function loadTasks() {
                const loadedTasks = await loadAllTasks();
                setTasks(loadedTasks); //this 'worked'
                setUpdate(false);
            };
            loadTasks();
        }
    }, [update]);

    
    if (tasks === null) {
        return (<Row></Row>);
    }
    return (
        <Row>
            <Switch>
                <Route path='/' exact>
                    <Sidebar names={props.filters} filter='All' />
                    <TaskList
                        filter='All'
                        tasks={tasks}
                        deleteTask={deleteTask}
                        handleShow={handleShowEdit}
                        previousName={(name) => setTaskName(name)}
                    />
                </Route>
                <Route path='/All'>
                    <Sidebar names={props.filters} filter='All' />
                    <TaskList
                        filter='All'
                        tasks={tasks}
                        deleteTask={deleteTask}
                        handleShow={handleShowEdit}
                        previousName={(name) => setTaskName(name)}
                    />
                </Route>

                <Route path='/Important'>
                    <Sidebar names={props.filters} filter='Important' />
                    <TaskList
                        filter='Important'
                        tasks={tasks.filter(t => t.important === 1)}
                        deleteTask={deleteTask}
                        handleShow={handleShowEdit}
                        previousName={(name) => setTaskName(name)}
                    />
                </Route>
                <Route path='/Today'>
                    <Sidebar names={props.filters} filter='Today' />
                    <TaskList
                        filter='Today'
                        tasks={tasks.filter(t => {
                            if (t.deadline === undefined)
                                return false;
                            let taskDate = new dayjs(t.deadline);
                            return taskDate.isSame(dayjs(), 'day');
                        })}
                        deleteTask={deleteTask}
                        handleShow={handleShowEdit}
                        previousName={(name) => setTaskName(name)}
                    />
                </Route>
                <Route path='/Next7Days'>
                    <Sidebar names={props.filters} filter='Next 7 Days' />
                    <TaskList
                        filter='Next 7 Days'
                        tasks={tasks.filter(t => {
                            if (t.deadline === undefined)
                                return false;
                            let taskDate = new dayjs(t.deadline);
                            let next7Days = dayjs().add(8, 'day');
                            return taskDate.isAfter(dayjs(), 'day') && taskDate.isBefore(next7Days, 'day');
                        })}
                        deleteTask={deleteTask}
                        handleShow={handleShowEdit}
                        previousName={(name) => setTaskName(name)}
                    />
                </Route>
                <Route path='/Private'>
                    <Sidebar names={props.filters} filter='Private' />
                    <TaskList
                        filter='Private'
                        tasks={tasks.filter(t => t.priv === 1)}
                        deleteTask={deleteTask}
                        handleShow={handleShowEdit}
                        previousName={(name) => setTaskName(name)}
                    />
                </Route>



            </Switch>
            <AddTask handleShow={handleShow} />
            <AddTaskForm
                show={show}
                handleClose={handleClose}
                addTask={addTask}
                tasks={tasks}
                setUpdate={setUpdate}
            />
            <EditTaskForm
                show={showEdit}
                handleClose={handleCloseEdit}
                updateTask={updateTask}
                tasks={tasks}
                taskName={taskName}
            />

        </Row>

    );

}

function AddTask(props) {
    return (
        <Button variant="success" className="add-button" onClick={props.handleShow}>
            <Plus className="icon-plus" />
        </Button>
    );
}

export default MainContent;
