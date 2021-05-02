import { Row, Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import Sidebar from './Sidebar.js';
import TaskList from './TaskList.js';
import AddTaskForm from './AddTaskForm.js';
import EditTaskForm from './EditTaskForm.js';
import React, { useState } from 'react';
import dayjs from 'dayjs';

let fakeTasks = [
    { name: 'Laundry', urgent: true, priv: true, date: undefined },
    { name: 'Monday lab', urgent: false, priv: false, date: '2021-04-26T10:00' },
    { name: 'Phone call', urgent: true, priv: true, date: '2021-05-08T16:20' },
    { name: 'Biking', urgent: false, priv: false, date: '2021-04-24T11:00' },
    { name: 'Liberazione d\'Italia', urgent: false, priv: true, date: '2021-04-25T10:00' },
    { name: 'Festa dei lavoratori ', urgent: false, priv: true, date: '2021-05-01T14:40' },
];

function MainContent(props) {
    const [selected, setSelected] = useState('All');
    const updateSelected = (name) => setSelected(name);
    const [tasks, setTasks] = useState([...fakeTasks]);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [taskName, setTaskName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);


    const deleteTask = (name) => {
        setTasks((oldTasks) => oldTasks.filter(t => t.name !== name));
        fakeTasks = fakeTasks.filter(t => t.name !== name);
    };

    const addTask = (task) => {
        setTasks(oldTasks => [...oldTasks, task]);
        fakeTasks = [...fakeTasks, task];
    };

    const updateTask = (task) =>{
        setTasks(oldTasks => [...oldTasks.filter(t=>t.name!==task.name), task]);
        fakeTasks = [...fakeTasks.filter(t=>t.name!==task.name), task];
    }

    const filterAll = () => {
        setTasks(fakeTasks);
    };

    const filterImportant = () => {
        setTasks(fakeTasks);
        setTasks((oldTasks) => oldTasks.filter(t => t.urgent === true));
    };

    const filterToday = () => {
        setTasks(fakeTasks);
        setTasks((oldTasks) => oldTasks.filter(t => {
            if (t.date === undefined)
                return false;
            let taskDate = new dayjs(t.date);
            return taskDate.isSame(dayjs(), 'day');
        }));
    };

    const filterNext7Days = () => {
        setTasks(fakeTasks);
        setTasks((oldTasks) => oldTasks.filter(t => {
            if (t.date === undefined)
                return false;
            let taskDate = new dayjs(t.date);
            let next7Days = dayjs().add(8, 'day');
            return taskDate.isAfter(dayjs(), 'day') && taskDate.isBefore(next7Days, 'day');
        }));
    };

    const filterPrivate = () => {
        setTasks(fakeTasks);
        setTasks((oldTasks) => oldTasks.filter(t => t.priv === true));
    };

    const filterFunctions = {
        "All": filterAll,
        "Important": filterImportant,
        "Today": filterToday,
        "Next 7 Days": filterNext7Days,
        "Private": filterPrivate
    };


    return (
        <Row>
            <Sidebar
                names={props.filters}
                selectFilter={updateSelected}
                filterFunctions={filterFunctions}
            />
            <TaskList 
            filter={selected} 
            tasks={tasks} 
            deleteTask={deleteTask} 
            handleShow={handleShowEdit}
            previousName={(name)=>setTaskName(name)}
            />
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
