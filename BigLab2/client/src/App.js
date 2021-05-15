import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './NavigationBar.js';
import MainContent from './MainContent.js';
import { BrowserRouter as Router } from 'react-router-dom';

const filters = ["All", "Important", "Today", "Next 7 Days", "Private"];

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationBar />
          <MainContent filters={filters} />
        </Router>
      </React.Fragment>
    );
  }
}
export default App;
