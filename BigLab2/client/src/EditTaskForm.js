import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';

function EditTaskForm(props) {
    const [urgent, setUrgent] = useState(false);
    const [priv, setPriv] = useState(false);
    const [date, setDate] = useState('');
    const [errorMessage, setErrorMessage] = useState();

    const haldleSubmit = (event) => {
        event.preventDefault();

        if (date === '') {
            setErrorMessage('A task must have a date');
        } else {
            setErrorMessage('');
            setUrgent(false);
            setPriv(false);
            const task = { name: props.taskName, urgent: urgent, priv: priv, date: date };
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
                        onChange={() => setUrgent( important => !important )}
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
                        onChange={ev => setDate(ev.target.value)}
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