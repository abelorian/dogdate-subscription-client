import React, { Component } from 'react';
import './App.css';
import Addresses from './Addresses'
import DogDateData from './DogDateData'
import Matchs from './Matchs'

class App extends Component {
  render() {
    return (
      <div>
        <Matchs />
        <DogDateData />
        <Addresses />
      </div>
    )
  }
}

export default App;
