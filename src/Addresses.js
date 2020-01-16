import React from 'react'
import AddressesView from './AddressesView'
import { useQuery } from '@apollo/react-hooks'
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

function Address(){
  const { loading, error, data, subscribeToMore } = useQuery(ADDRESS)

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

  const addresses = [...new Map(data.addresses.map(o => [o.id, o])).values()] // remove duplicated

  return (
    <div>
      <h3>Addresses</h3>
      <AddressesView data={addresses} subscribeToMore={more} />
    </div>
    )
}

export default Address
