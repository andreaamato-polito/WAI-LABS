import { Row, Button, Modal, Form } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import Sidebar from './Sidebar.js';
import TaskList from './TaskList';
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

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const deleteTask = (name) => {
        setTasks((oldTasks) => oldTasks.filter(t => t.name !== name));
        fakeTasks = fakeTasks.filter(t => t.name !== name);
    };

    const addTask = (task) => {
        setTasks(oldTasks => [...oldTasks, task]);
        fakeTasks = [...fakeTasks, task];
    };

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
            <TaskList filter={selected} tasks={tasks} deleteTask={deleteTask} />
            <AddTask handleShow={handleShow} />
            <TaskForm show={show} handleClose={handleClose} addTask={addTask} tasks={tasks} />
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

function TaskForm(props) {
    const [name, setName] = useState('');
    const [urgent, setUrgent] = useState(false);
    const [priv, setPriv] = useState(false);
    const [date, setDate] = useState('');
    const [errorMessage, setErrorMessage] = useState();

    const haldleSubmit = (event) => {
        event.preventDefault();
        if (name === '' || props.tasks.map(t => t.name).includes(name) || date === '') {

            if (date === '')
                setErrorMessage('A task must have a date');
            if (props.tasks.map(t => t.name).includes(name))
                setErrorMessage('Task descriptions must be unique');
            if (name === '')
                setErrorMessage('A task must have a description');

        } else {
            setErrorMessage('');
            setDate('');
            setName('');
            const task = { name: name, urgent: urgent, priv: priv, date: date };
            props.addTask(task);
            props.handleClose();
        }
    };

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title>Add a new task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Description"
                        onChange={ev => setName(ev.target.value)}
                    />
                    <Form.Check
                        className="form"
                        label="Important"
                        type={'checkbox'}
                        id={'check-important'}
                        onChange={ev => setUrgent(ev.target.value === 'on')}
                    />
                    <Form.Check
                        className="form"
                        label="Private"
                        type={'checkbox'}
                        id={'checkbox-private'}
                        onChange={ev => setPriv(ev.target.value === 'on')}
                    />
                    <Form.Control
                        type='date'
                        onChange={ev => setDate(ev.target.value)} />
                    {/*<Form.Control type="datetime-local" onChange={ev => setDate(dayjs(ev.taget.value))}/>*/}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <h6 className="important error-msg">{errorMessage}</h6>
                <Button variant="secondary" onClick={() => { 
                    setDate('');
                    setName('');
                    setErrorMessage(''); 
                    props.handleClose() }}>
                    Close
                </Button>
                <Button variant="success" onClick={haldleSubmit}>
                    Add Task
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MainContent;
