import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import './App.css';
import NavigationBar from './NavigationBar.js';
import Sidebar from './Sidebar.js';
import TaskList from './TaskList';

const filters = ["All", "Important", "Today", "Next 7 Days", "Private"];

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <MainContent />
      </React.Fragment>
    );
  }
}

function MainContent(props) {
  const [selected, setSelected] = useState('All');
  const updateSelected = (name) => setSelected(name);

  return (
    <Row>
      <Sidebar names={filters} selectFilter={updateSelected} />
      <TaskList filter={selected} />
      <AddTask />
    </Row>
  );
}

function AddTask(props) {
  return (
    <Button variant="success" className="add-button">
      <Plus className="icon-plus" />
    </Button>
  );
}

export default App;
