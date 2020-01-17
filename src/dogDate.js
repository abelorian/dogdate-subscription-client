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
      {data.map(dogDate =>
        <div key={dogDate.id}>
          <p>id: {dogDate.id} | state: {dogDate.state} | startAt: {dogDate.startsAt} | updatedAt: {dogDate.updatedAt}</p>
        </div>
      )}
      </div>
    )
  }

}

export default DogDate