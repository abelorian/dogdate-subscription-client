import React, { Component } from 'react';
import './App.css';
import Addresses from './Addresses'
import DogDateData from './DogDateData'

class App extends Component {
  render() {
    return (
      <div>
        <Addresses />
        <DogDateData />
      </div>
    )
  }
}

export default App;
