import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './NavigationBar.js';
import MainContent from './MainContent.js';

const filters = ["All", "Important", "Today", "Next 7 Days", "Private"];

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <MainContent filters={filters} />
      </React.Fragment>
    );
  }
}
export default App;
