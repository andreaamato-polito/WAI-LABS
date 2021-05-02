import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';


function AddTaskForm(props) {
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
                        type={'radio'}
                        id={'radio-important'}
                        onChange={ev => setUrgent(ev.target.value === 'on')}
                    />
                    <Form.Check
                        className="form"
                        label="Private"
                        type={'radio'}
                        id={'radio-private'}
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

export default AddTaskForm;

