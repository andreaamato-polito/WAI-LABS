import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { addNewTask } from './API';


function Task(description, important, priv, deadline, completed, user) {
    this.description = description,
    this.important = important,
    this.priv = priv,
    this.deadline = deadline,
    this.completed = completed,
    this.user = user
};


function AddTaskForm(props) {

    const [description, setDescription] = useState('');
    const [important, setImportant] = useState(0);
    const [priv, setPriv] = useState(0);
    const [deadline, setDeadline] = useState('');
    const [completed, setCompleted] = useState(0);
    const [user, setUser] = useState(1)
    const [errorMessage, setErrorMessage] = useState();

    const haldleSubmit = (event) => {
        event.preventDefault();
        if (description === '' || props.tasks.map(t => t.description).includes(description) || deadline === '' || dayjs(deadline).isBefore(dayjs(), 'day')) {

            if (dayjs(deadline).isBefore(dayjs(), 'day'))
                setErrorMessage('Select a valid date');
            if (deadline === '')
                setErrorMessage('A task must have a date');
            if (props.tasks.map(t => t.description).includes(description))
                setErrorMessage('Task descriptions must be unique');
            if (description === '')
                setErrorMessage('A task must have a description');

        } else {
            setErrorMessage('');
            setDeadline('');
            setDescription('');
            const task = new Task(description, important, priv, deadline, completed, user);

            async function addTask() {
                const response = await addNewTask(task);
                if (response.ok) {
                    props.setUpdate(true);
                }
            }

            addTask();
            
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
                        onChange={ev => setDescription(ev.target.value)}
                    />
                    <Form.Check
                        className="form"
                        label="Important"
                        type={'checkbox'}
                        id={'checkbox-important'}
                        onChange={() => setImportant(important => !important)}
                    />
                    <Form.Check
                        className="form"
                        label="Private"
                        type={'checkbox'}
                        id={'checkbox-private'}
                        onChange={() => setPriv(priv => !priv)}
                    />
                    <Form.Control
                        type='datetime-local'
                        onChange={ev => setDeadline(ev.target.value)} />
                    {/*<Form.Control type="datetime-local" onChange={ev => setDate(dayjs(ev.taget.value))}/>*/}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <h6 className="important error-msg">{errorMessage}</h6>
                <Button variant="secondary" onClick={() => {
                    setDeadline('');
                    setDescription('');
                    setErrorMessage('');
                    props.handleClose()
                }}>
                    Close
                </Button>
                <Button variant="success" onClick={haldleSubmit}>
                    Add Task
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddTaskForm;

