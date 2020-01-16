import React, { Component } from 'react'
import AddressesView from './AddressesView'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ADDRESS = gql`
  query {
    addresses {
      id
      line1
      line2
      countryId
    }
  }`

const NEW_ADDRESS = gql`
  subscription {
    newAddress {
      id
      line1
      line2
      countryId
    }
  }
`

class Address extends Component {
  render() {
    return (
      <Query query={ADDRESS}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error</div>

          const more = ()  =>   subscribeToMore({
            document: NEW_ADDRESS,
            updateQuery: (prev, { subscriptionData }) => {
              console.log("updateQuery")

              if (!subscriptionData.data) return prev

              const newAddress = subscriptionData.data.newAddress

              return Object.assign({}, prev, {
                addresses: [...prev.addresses, newAddress],
                __typename: "Address"
              })

            }
          })

          console.log("query 1")

          const addresses = [...new Map(data.addresses.map(o => [o.id, o])).values()]

          return (
            <div>
              <h3>Addresses</h3>
              <AddressesView data={addresses} subscribeToMore={more} />
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Address
