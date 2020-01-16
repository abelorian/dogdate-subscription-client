import React, { Component } from 'react'

class DogDate extends Component {

  componentDidMount() {
    this.props.subscribeToMore();
  }

  render(){
    const {data} = this.props;
    console.log(data)
    return (
      <div>
        <h2>Dog id: 1</h2>
        <p>state: {data.dogDate.state}</p>
        <p>startAt: {data.dogDate.startsAt}</p>
        <p>updatedAt: {data.dogDate.updatedAt}</p>
      </div>
    )
  }

}

export default DogDate