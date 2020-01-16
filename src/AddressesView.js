import React, { Component } from 'react'

class AddressesView extends Component {

  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        {data.map(address => 

          <div className='address-container' key={address.id}>
            <div>
              {address.id} | {address.countryId} | {address.line1} | {address.line2}
            </div>
          </div>

        )}
      </div>

    )
  } 
}

export default AddressesView
