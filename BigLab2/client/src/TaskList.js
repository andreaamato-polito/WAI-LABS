import React from 'react';
import { PencilSquare, Trash, PersonSquare } from 'react-bootstrap-icons';
import { Row, Col, Form, Dropdown } from 'react-bootstrap';
import dayjs from 'dayjs';
import { deleteTask, markTask, applyFilter } from './API';
import { useEffect } from 'react';


function TaskList(props) {
    useEffect(() => {
        async function filterTasks() {
            const filteredTasks = await applyFilter(props.filter.replace(/\s+/g, ''));
            props.filterTasks(filteredTasks);
            props.setUpdateFilter(false);
        };
        filterTasks();

    }, [props.filter, props.updateFilter]);


    return (
        <Col xs={12} md={8}>
            <h4 className="main-content"><strong>Filter: </strong>{props.filter}</h4>

            {props.tasks.map((t) => <Task
                key={t.id}
                task={t}
                delete={props.deleteTask}
                handleShow={props.handleShow}
                previousName={props.previousName}
                previousId={props.previousId}
                update={props.update}
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
    if (props.task.important)
        important = "important";
    if (props.task.deadline !== undefined)
        date = new dayjs(props.task.deadline)

    return (
        <React.Fragment>

            <Row>
                <Col>
                    <Form.Check
                        className={important}
                        label={props.task.description}
                        checked={props.task.completed === 1}
                        onChange={() => {
                            async function toggle() {
                                const response = await markTask(props.task.id);
                                if (response.ok) {
                                    props.update(true);
                                }
                            }

                            toggle();
                        }}
                    />
                </Col>
                <Col xs={2}>
                    {status}
                </Col>
                <Col className="date">
                    {date.toString() === "Invalid Date" ? undefined : date.format('dddd, MMMM D YYYY h:mm a')}
                    {/*<DayJS format="dddd, MMMM D YYYY hh:mm a">{props.task.date}</DayJS>*/}
                </Col>
                <Col xs={1}>
                    <span onClick={() => {
                        props.previousName(props.task.description);
                        props.previousId(props.task.id);
                        props.handleShow();
                    }}>
                        <PencilSquare className="clickable" />
                    </span>
                </Col>
                <Col xs={1}>
                    <span onClick={() => {
                        async function deleteT() {
                            const response = await deleteTask(props.task.id);
                            if (response.ok) {
                                props.delete(props.task.id);
                                //props.setUpdate(true);
                            }
                        }
                        deleteT();
                    }}>
                        <Trash className="clickable" />
                    </span>
                </Col>
            </Row>
            <Dropdown.Divider />
        </React.Fragment>
    );
}


export default TaskList;
