import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { updateTask } from './API';


function Task(description, important, priv, deadline) {
    this.description = description,
        this.important = important,
        this.priv = priv,
        this.deadline = deadline
};


function EditTaskForm(props) {
    const [description, setDescription] = useState('');
    const [important, setImportant] = useState(0);
    const [priv, setPriv] = useState(0);
    const [deadline, setDeadline] = useState('');
    const [errorMessage, setErrorMessage] = useState();

    const haldleSubmit = (event) => {
        event.preventDefault();

        setErrorMessage('');
        setImportant(0);
        setPriv(0);

        let task = new Task(props.taskName, important, priv, deadline);

        if (description != '') {
            task = new Task(description, important, priv, deadline);
        }
        async function updateT() {
            const response = await updateTask(props.taskId, task);
            if (response.ok) {

                props.setUpdate(true);
            }
        }

        updateT();

        //props.updateTask(task); 
        props.handleClose();

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
                        placeholder={props.taskName}
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