import React, { Component } from 'react';
import './App.css';
import { Authorities } from './Authorities.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FHS ratings</h1>
        </header>
        <Authorities url="http://api.ratings.food.gov.uk/Authorities/basic"/>
      </div>
    );
  }
}

export default App;
