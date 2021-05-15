import { Row, Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import Sidebar from './Sidebar.js';
import TaskList from './TaskList.js';
import AddTaskForm from './AddTaskForm.js';
import EditTaskForm from './EditTaskForm.js';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Route, Switch } from 'react-router';


function Task(id, description, important, priv, deadline, completed, user) {
        this.id = id,
        this.description = description,
        this.important = important,
        this.priv = priv,
        this.deadline = deadline,
        this.completed = completed,
        this.user = user
};

function MainContent(props) {
    const [tasks, setTasks] = useState(null); //here
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [taskName, setTaskName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);


    const deleteTask = (name) => {
        setTasks((oldTasks) => oldTasks.filter(t => t.name !== name));
        //fakeTasks = fakeTasks.filter(t => t.name !== name);
    };

    const addTask = (task) => {
        setTasks(oldTasks => [...oldTasks, task]);
        //console.log(task);

        //fakeTasks = [...fakeTasks, task];
    };

    const updateTask = (task) => {
        setTasks(oldTasks => [...oldTasks.filter(t => t.name !== task.name), task]);
        //fakeTasks = [...fakeTasks.filter(t => t.name !== task.name), task];
    }


    useEffect(() => {
        async function loadTasks() {
            const response = await fetch('api/tasks');
            const loadedTasks = await response.json();
            const tasksArray = await loadedTasks.map(lt => {
                const t = JSON.parse(JSON.stringify(lt));
                return new Task(t.id, t.description, t.important, t.private, t.deadline, t.completed, t.user);
            });

            setTasks(tasksArray); //this 'worked'

        }

        loadTasks();
    }, [tasks]);

    /*
    useEffect((task) => {
        fetch('api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).catch(function (error) {
            console.log('Failed to store data on server: ', error);
        });

    }, []);
    */

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
