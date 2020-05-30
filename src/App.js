import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="button">
          <Button variant="contained" color="primary" size="large">Exit </Button>
          <Button variant="contained" color="primary" size="large">Add </Button>
          <Button variant="contained" color="primary" size="large">Edit </Button>
          <Button variant="contained" color="primary" size="large">Delete </Button>
          </div>
        </header>
    </div>
  );

}

export default App;

