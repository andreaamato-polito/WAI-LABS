import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';

function Task(description, important, priv, deadline, completed, user) {
    this.description = description,
        this.important = important,
        this.priv = priv,
        this.deadline = deadline,
        this.completed = completed,
        this.user = user
};


function EditTaskForm(props) {
    const [important, setImportant] = useState(0);
    const [priv, setPriv] = useState(0);
    const [deadline, setDeadline] = useState('');
    const [completed, setCompleted] = useState(0);
    const [user, setUser] = useState(1)
    const [errorMessage, setErrorMessage] = useState();

    const haldleSubmit = (event) => {
        event.preventDefault();

        if (deadline === '') {
            setErrorMessage('A task must have a date');
        } else {
            setErrorMessage('');
            setImportant(0);
            setPriv(0);
           
            //const task = { name: props.taskName, urgent: important, priv: priv, date: deadline };
            const task = new Task(props.taskName, important, priv, deadline, completed, user);
            
            props.updateTask(task); 
            props.handleClose();
        }
    }


    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title>Edit task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Control
                        type='text'
                        value={props.taskName}
                        readOnly
                    />
                    <Form.Check
                        className="form"
                        label="Important"
                        type={'checkbox'}
                        id={'checkbox-important'}
                        onChange={() => setImportant( important => !important )}
                    />
                    <Form.Check
                        className="form"
                        label="Private"
                        type={'checkbox'}
                        id={'checkbox-private'}
                        onChange={() => setPriv( priv => !priv )}
                    />
                    <Form.Control
                        type='datetime-local'
                        onChange={ev => setDeadline(ev.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <h6 className="important error-msg">{errorMessage}</h6>

                <Button variant="secondary" onClick={() => {
                    setErrorMessage('');
                    props.handleClose()
                }}>
                    Close
                </Button>
                <Button variant="success" onClick={haldleSubmit}>
                    Edit Task
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default EditTaskForm;