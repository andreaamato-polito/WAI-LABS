import React, { useState } from 'react';
import { Col, Dropdown, Button } from 'react-bootstrap';


function Sidebar(props) {
    const [selected, setSelected] = useState('All');

    const updateSelected = (name) => setSelected(name);

    return (
        <Col xs={12} md={4} className="filters">
            {props.names.map(
                (n) =>
                    <Filter key={n} name={n} chosen={n === selected} 
                    updateSelected={updateSelected} 
                    selectFilter={props.selectFilter}
                    />
            )}
        </Col>
    );
}

function Filter(props) {
    let color = "light";

    if (props.chosen)
        color = "success";

    return (
        <div>
            <Button onClick={() => {
                props.updateSelected(props.name)
                props.selectFilter(props.name)
            }} 
            variant={color} 
            href="#"
            className="filter-button"
            size="lg">
                {props.name}
            </Button>
            <Dropdown.Divider className="filter-divider" />
        </div>
    );

}

{/*
function Filter(props) {
    if (props.chosen) {
        return (
            <React.Fragment>
                <Dropdown.Item className="filter selected" href="#">{props.name}</Dropdown.Item>
                <Dropdown.Divider className="filter-divider" />
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <Dropdown.Item onClick={()=>props.updateSelected(props.name)} className="filter" href="#">{props.name}</Dropdown.Item>
                <Dropdown.Divider className="filter-divider" />
            </React.Fragment>
        );
    }
}

*/}

export default Sidebar;