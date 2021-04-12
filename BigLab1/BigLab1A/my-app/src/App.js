import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormControl, Navbar, Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar bg="success" variant="dark">
          <Col  xs={4} >
          <Navbar.Brand href="#home"><i class="fas fa-check-double"></i> ToDO Manager</Navbar.Brand>

          </Col>

          <Col xs={7}>

          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
          
          </Col>
          

         <Col xs={1}>
         <i class="fas fa-user-circle fa-2x icon"></i>

         </Col>

        </Navbar>

          <Row>
            <Col xs={12} md={4} className="filters">
              <Dropdown.Item className="filter filter-all selected" href="#">All</Dropdown.Item>
              <Dropdown.Divider className="filter-divider" />
              <Dropdown.Item className="filter filter-important" href="#">Important</Dropdown.Item>
              <Dropdown.Divider className="filter-divider" />
              <Dropdown.Item className="filter filter-today" href="#">Today</Dropdown.Item>
              <Dropdown.Divider className="filter-divider" />
              <Dropdown.Item className="filter filter-week" href="#">Next 7 Days</Dropdown.Item>
              <Dropdown.Divider className="filter-divider" />
              <Dropdown.Item className="filter filter-private" href="#">Private</Dropdown.Item>
            </Col>

            <Col xs={12} md={8}>
              <h4 className="main-content"><strong>Filter: </strong>all</h4>
              <Row>
                <Col>
                  <Form.Check label="Study for the exam" />
                </Col>
                <Col>
                  {/*If private*/}
                </Col>
                <Col className="date">
                  {/*If date*/}
                </Col>
                <Col xs={1}>
                  <i class="far fa-edit"></i>
                </Col>
                <Col xs={1}>
                  <i class="far fa-trash-alt"></i>
                </Col>
              </Row>
              <Dropdown.Divider />

              <Row>
                <Col>
                  <Form.Check label="Prepare the slides for the exam" />
                </Col>
                <Col xs={2}>
                  <i class="fas fa-user-lock" />
                </Col>
                <Col className="date">
                  Saturday, June 20th 2020, 12:00:00 am
                </Col>

                <Col xs={1}>
                  <i class="far fa-edit"></i>
                </Col>
                <Col xs={1}>
                  <i class="far fa-trash-alt"></i>
                </Col>

              </Row>
              <Dropdown.Divider />

              <Row>
                <Col>
                  <Form.Check label="Call Mary" />
                </Col>
                <Col>
                  {/*If private*/}
                </Col>
                <Col className="date">
                  {/*If date*/}
                </Col>

                <Col xs={1}>
                  <i class="far fa-edit"></i>
                </Col>
                <Col xs={1}>
                  <i class="far fa-trash-alt"></i>
                </Col>
              </Row>
              <Dropdown.Divider />

            </Col>
          </Row>

          <Row>
            <Button variant="success" className="add-button">
              <i class="fas fa-plus"></i>
            </Button>
          </Row>



      </React.Fragment>
    );
  }
}

export default App;
