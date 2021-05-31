import { Row, Button, Container, Alert } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import Sidebar from './Sidebar.js';
import TaskList from './TaskList.js';
import AddTaskForm from './AddTaskForm.js';
import EditTaskForm from './EditTaskForm.js';
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import dayjs from 'dayjs';
import { loadAllTasks, applyFilter, getUserInfo, logIn, logOut } from './API.js';
import { LoginForm, LogoutButton } from './LoginComponents';
import NavigationBar from './NavigationBar.js';


const routes = ["", "All", "Important", "Today", "Next 7 Days", "Private"];

function MainContent(props) {
    const [tasks, setTasks] = useState([]);
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

    const [message, setMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // TODO: store user info somewhere and use them, if needed
                await getUserInfo();
                setLoggedIn(true);
            } catch (err) {
                console.error(err.error);
            }
        };
        checkAuth();
    }, []);


    useEffect(() => {
        if (loggedIn) {
            if (update) {
                async function loadTasks() {
                    const loadedTasks = await loadAllTasks();
                    setTasks(loadedTasks); //this 'worked'
                    setUpdate(false);
                };
                loadTasks().catch(err => {
                    setMessage({ msg: "Impossible to load your tasks! Please, try again later...", type: 'danger' });
                    console.error(err);
                });
            }
        }
    }, [update, loggedIn]);

    const handleErrors = (err) => {
        if (err.errors)
            setMessage({ msg: err.errors[0].msg + ': ' + err.errors[0].param, type: 'danger' });
        else
            setMessage({ msg: err.error, type: 'danger' });
        setUpdate(true);
    }

    const deleteTask = (id) => {
        setTasks((oldTasks) => oldTasks.filter(t => t.id !== id));
    };

    const addTask = (task) => {
        setTasks(oldTasks => [...oldTasks, task]);
    };

    const updateTask = (task) => {
        setTasks(oldTasks => [...oldTasks.filter(t => t.description !== task.description), task]);
    }

    const doLogIn = async (credentials) => {
        try {
            const user = await logIn(credentials);
            setLoggedIn(true);
            setMessage({ msg: `Welcome, ${user}!`, type: 'success' });
        } catch (err) {
            setMessage({ msg: err, type: 'danger' });
        }

    };

    const doLogOut = async () => {
        await logOut();
        setLoggedIn(false);
        setTasks([]);
    };

    /*
    <Row>
        {loggedIn ? <LogoutButton logout={doLogOut} /> : <Redirect to="/login" />}
    </Row>
    {message && <Row>
                <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
            </Row>}
    
    */

    return (
        <React.Fragment>
            

            <NavigationBar loggedIn={loggedIn} doLogOut={doLogOut} message={message} deleteMessage={()=>setMessage('')}/>

            <Row>

                <Switch>
                    <Route path="/login">
                        {loggedIn ? <Redirect to="/" /> : <LoginForm login={doLogIn} />}
                    </Route>
                    {routes.map(route =>
                        <Route key={route} path={'/' + route}>
                            {loggedIn ?
                                <React.Fragment>
                                    <Sidebar names={props.filters} filter={route} filterTasks={setTasks} />
                                    <TaskList
                                        filter={route}
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
                                </React.Fragment>
                                : <Redirect to="/login" />}
                        </Route>
                    )}

                </Switch>

                {loggedIn && <AddTask handleShow={handleShow} />}
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
        </React.Fragment>

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
