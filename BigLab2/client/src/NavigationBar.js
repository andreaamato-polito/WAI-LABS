import React from 'react';
import { Form, FormControl, Navbar, Col, Row, Alert } from 'react-bootstrap';
import { CheckAll } from 'react-bootstrap-icons';
import { LogoutButton } from './LoginComponents';
import { Redirect } from 'react-router';




function NavigationBar(props) {
    return (<Navbar bg="success" variant="dark">
        <Col xs={4} >
            <Navbar.Brand href="#home"><CheckAll className="icon-logo" /> ToDO Manager</Navbar.Brand>

        </Col>

        <Col xs={5}>
            {props.loggedIn &&
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
            }
        </Col>

        <Col xs={2}>
            {props.message && <Row>
                <Alert variant={props.message.type} onClose={props.deleteMessage} dismissible>{props.message.msg}</Alert>
            </Row>}
        </Col>

        <Col xs={1}>
            {props.loggedIn ?
            <LogoutButton logout={props.doLogOut} /> : <Redirect to="/login" />
            }   
        </Col>

    </Navbar>
    );
}

export default NavigationBar;