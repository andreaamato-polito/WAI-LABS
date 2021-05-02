import React from 'react';
import { PencilSquare, Trash, PersonSquare } from 'react-bootstrap-icons';
import { Row, Col, Form, Dropdown } from 'react-bootstrap';
import dayjs from 'dayjs';

function TaskList(props) {
    return (
        <Col xs={12} md={8}>
            <h4 className="main-content"><strong>Filter: </strong>{props.filter}</h4>
            {props.tasks.map((t) => <Task
                key={t.name}
                task={t}
                delete={props.deleteTask}
                handleShow={props.handleShow}
                previousName={props.previousName}
            />)}
        </Col>
    );
}



function Task(props) {
    let status = undefined;
    let important = undefined;
    let date = undefined;

    if (props.task.priv)
        status = <PersonSquare />
    if (props.task.urgent)
        important = "important";
    if (props.task.date !== undefined)
        date = new dayjs(props.task.date)
    
    return (
        <React.Fragment>

            <Row>
                <Col>
                    <Form.Check className={important} label={props.task.name} />
                </Col>
                <Col xs={2}>
                    {status}
                </Col>
                <Col className="date">
                    {date===undefined ? undefined : date.format('dddd, MMMM D YYYY')}
                    {/*<DayJS format="dddd, MMMM D YYYY hh:mm a">{props.task.date}</DayJS>*/}
                </Col>
                <Col xs={1}>
                    <span onClick={() => {
                        props.previousName(props.task.name)
                        props.handleShow()
                    }}>
                        <PencilSquare className="clickable" />
                    </span>
                </Col>
                <Col xs={1}>
                    <span onClick={() => { props.delete(props.task.name) }}>
                        <Trash className="clickable" />
                    </span>
                </Col>
            </Row>
            <Dropdown.Divider />
        </React.Fragment>
    );
}


export default TaskList;
