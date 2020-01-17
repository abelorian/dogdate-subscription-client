import React, { Component } from 'react'

class Match extends Component {

  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    const {data} = this.props;
    console.log(data)
    return (
      <div>
      <h2>My Matchs</h2>
      { data.map(match =>
        <p key={match.id}>Match: {match.id} | {match.state} | {match.rating} | {match.expiresAt} | {match.dogDate.owner.fullName}</p>
      )}
      </div>
    )
  }

}

export default Match