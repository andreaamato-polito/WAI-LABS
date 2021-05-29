import { Row, Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import Sidebar from './Sidebar.js';
import TaskList from './TaskList.js';
import AddTaskForm from './AddTaskForm.js';
import EditTaskForm from './EditTaskForm.js';
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import dayjs from 'dayjs';
import { loadAllTasks, applyFilter } from './API.js';
import { LoginForm, LogoutButton } from './LoginComponents';

function MainContent(props) {
    const [tasks, setTasks] = useState(null);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskId, setTaskId] = useState(-1);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [update, setUpdate] = useState(true);
    const [updateFilter, setUpdateFilter] = useState(true);

    


    const deleteTask = (id) => {
        setTasks((oldTasks) => oldTasks.filter(t => t.id !== id));
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
                    <Sidebar names={props.filters} filter='All' filterTasks={setTasks}/>
                    <TaskList
                        filter='All'
                        filterTasks={setTasks}
                        tasks={tasks}
                        deleteTask={deleteTask}
                        handleShow={handleShowEdit}
                        previousName={(name) => setTaskName(name)}
                        previousId={(id) => setTaskId(id)}
                        update={setUpdate}
                        updateFilter={updateFilter}
                        setUpdateFilter={setUpdateFilter}
                    />
                </Route>
                <Route path='/All'>
                    <Sidebar names={props.filters} filter='All' filterTasks={setTasks}/>
                    <TaskList
                        filter='All'
                        filterTasks={setTasks}
                        tasks={tasks}
                        deleteTask={deleteTask}
                        handleShow={handleShowEdit}
                        previousName={(name) => setTaskName(name)}
                        previousId={(id) => setTaskId(id)}
                        update={setUpdate}
                        updateFilter={updateFilter}
                        setUpdateFilter={setUpdateFilter}
                    />
                </Route>

                <Route path='/Important'>
                    <Sidebar names={props.filters} filter='Important' filterTasks={setTasks}/>
                    <TaskList
                        filter='Important'
                        filterTasks={setTasks}
                        tasks={tasks}
                        deleteTask={deleteTask}
                        handleShow={handleShowEdit}
                        previousName={(name) => setTaskName(name)}
                        previousId={(id) => setTaskId(id)}
                        update={setUpdate}
                        updateFilter={updateFilter}
                        setUpdateFilter={setUpdateFilter}
                    />
                </Route>
                <Route path='/Today'>
                    <Sidebar names={props.filters} filter='Today' filterTasks={setTasks}/>
                    <TaskList
                        filter='Today'
                        filterTasks={setTasks}
                        tasks={tasks}
                        deleteTask={deleteTask}
                        handleShow={handleShowEdit}
                        previousName={(name) => setTaskName(name)}
                        previousId={(id) => setTaskId(id)}
                        update={setUpdate}
                        updateFilter={updateFilter}
                        setUpdateFilter={setUpdateFilter}
                    />
                </Route>
                <Route path='/Next7Days'>
                    <Sidebar names={props.filters} filter='Next 7 Days' filterTasks={setTasks}/>
                    <TaskList
                        filter='Next 7 Days'
                        filterTasks={setTasks}
                        tasks={tasks}
                        deleteTask={deleteTask}
                        handleShow={handleShowEdit}
                        previousName={(name) => setTaskName(name)}
                        previousId={(id) => setTaskId(id)}
                        update={setUpdate}
                        updateFilter={updateFilter}
                        setUpdateFilter={setUpdateFilter}
                    />
                </Route>
                <Route path='/Private'>
                    <Sidebar names={props.filters} filter='Private' filterTasks={setTasks}/>
                    <TaskList
                        filter='Private'
                        filterTasks={setTasks}
                        tasks={tasks}
                        deleteTask={deleteTask}
                        handleShow={handleShowEdit}
                        previousName={(name) => setTaskName(name)}
                        previousId={(id) => setTaskId(id)}
                        update={setUpdate}
                        updateFilter={updateFilter}
                        setUpdateFilter={setUpdateFilter}
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
                setUpdateFilter={setUpdateFilter}
            />
            <EditTaskForm
                show={showEdit}
                handleClose={handleCloseEdit}
                updateTask={updateTask}
                tasks={tasks}
                taskName={taskName}
                taskId={taskId}
                setUpdate={setUpdate}
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
