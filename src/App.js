import React, { Component } from 'react';
import './App.css';
import Addresses from './Addresses'
import DogDateData from './DogDateData'
import Matchs from './Matchs'
import MyDogDates from './MyDogDates'
import MyDogloverDates from './MyDogloverDates'

class App extends Component {
  render() {
    return (
      <div>
        <Matchs />
        <MyDogloverDates />
        <MyDogDates />
        <DogDateData />
        <Addresses />
      </div>
    )
  }
}

export default App;
