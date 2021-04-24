import React, { useState } from 'react';
import { PencilSquare, Trash, PersonSquare } from 'react-bootstrap-icons';
import { Row, Col, Form, Dropdown } from 'react-bootstrap';


let tasks = [];
tasks.push(new TaskObject("Study for the exam", true, false)); 
tasks.push(new TaskObject("Prepare the slides for the exam",true, "Saturday, June 20th 2020, 12:00:00 am")); 
tasks.push(new TaskObject("Call Mary", false, false)); 

function TaskList(props) {
    return (
        <Col xs={12} md={8}>
            <h4 className="main-content"><strong>Filter: </strong>{props.filter}</h4>
            {tasks.map( (t) => <Task task={t}/> )}
        </Col>
    );
}

function Task(props) {
    let status = undefined;
    if (props.task.priv)
        status = <PersonSquare />
    return (
        <React.Fragment>

        <Row>
            <Col>
                <Form.Check label={props.task.name} />
            </Col>
            <Col xs={2}>
                {status}
            </Col>
            <Col className="date">
                {props.task.date}
            </Col>
            <Col xs={1}>
                <PencilSquare />
            </Col>
            <Col xs={1}>
                <Trash />
            </Col>
        </Row>
        <Dropdown.Divider />
        </React.Fragment>
    );
}

function TaskObject(name, urgent, priv = true, date = undefined) {
    this.name = name;
    this.urgent = urgent;
    this.priv = priv;
    this.date = date;
}

function TaskListObject(tasks) {
    this.tasks = tasks;
    this.add = (task) => this.tasks.push(task);
    this.important = () => new TaskListObject(this.tasks.filter(t => t.urgent === true));
    this.priv = () => new TaskListObject(this.tasks.filter(t => t.priv === true));
    
}

export default TaskList;
