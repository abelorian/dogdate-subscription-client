import React, { Component } from 'react';
import './App.css';
import Addresses from './Addresses'
import DogDateData from './DogDateData'
import Matchs from './Matchs'
import MyDogDates from './MyDogDates'

class App extends Component {
  render() {
    return (
      <div>
        <MyDogDates />
        <Matchs />
        <DogDateData />
        <Addresses />
      </div>
    )
  }
}

export default App;
