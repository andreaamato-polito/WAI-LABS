import { Form, Button, Alert, Col } from 'react-bootstrap';
import { useState } from 'react';
import React from 'react';
import { BoxArrowRight } from 'react-bootstrap-icons';


//import { Redirect } from 'react-router';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        const credentials = { username, password };

        // SOME VALIDATION, ADD MORE!!!
        let valid = true;
        if (username === '' || password === '' || password.length < 6)
            valid = false;

        if (valid) {
            props.login(credentials);
        }
        else {
            setErrorMessage('Incorrect email and/or password');
        }
    };

    return (
        <Form style={{
            position: 'absolute', left: '50%', top: '40%',
            transform: 'translate(-50%, -50%)'
        }}>
            {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
            <Form.Group controlId='username'>
                <Form.Label>email</Form.Label>
                <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} />
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
            </Form.Group>
            <Button onClick={handleSubmit} variant="success">Login</Button>
        </Form>);
}

function LogoutButton(props) {
    return (
        <Col>
            <BoxArrowRight className='icon-user clickable' onClick={props.logout}/>
        </Col>
    );
}

export { LoginForm, LogoutButton };