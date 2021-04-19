import React from 'react';
import { Form, FormControl, Navbar, Col } from 'react-bootstrap';
import { CheckAll, PersonCircle } from 'react-bootstrap-icons';


function NavigationBar(props) {
    return (<Navbar bg="success" variant="dark">
        <Col xs={4} >
            <Navbar.Brand href="#home"><CheckAll className="icon-logo" /> ToDO Manager</Navbar.Brand>

        </Col>

        <Col xs={7}>

            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            </Form>

        </Col>


        <Col xs={1}>
            <PersonCircle className="icon-user" />

        </Col>

    </Navbar>
    );
}

export default NavigationBar;