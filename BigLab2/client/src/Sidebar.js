import React, { useState } from 'react';
import { Col, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar(props) {
    const [selected, setSelected] = useState(props.filter);

    const updateSelected = (name) => setSelected(name);

    return (
        <Col xs={12} md={4} className="filters">
            {props.names.map(
                (n) =>
                    <Filter key={n} name={n} chosen={n === selected}
                        updateSelected={updateSelected}
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
            <Link to={{pathname: '/' + props.name.replace(/\s+/g, ''), state: {filter: props.name}}}>
                <Button onClick={() => {
                    props.updateSelected(props.name)
                }}
                    variant={color}
                    className="filter-button"
                    size="lg">
                    {props.name}
                </Button>
            </Link>
            <Dropdown.Divider className="filter-divider" />
        </div>

    );

}

export default Sidebar;