import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import DogDate from './DogDate'


const DOGDATE = gql`
  query {
    dogDate(id: 1) {
      state
      startsAt
      updatedAt
    }
  }`

const UPDATE_DOG_DATE = gql`
  subscription {
    dogDateUpdate(id: 1) {
      state
      startsAt
      updatedAt
    }
  }
`

/*

// Live update, el valor cambia al disparar la dogDateUpdate

function DogDate(){

  const { data, loading, error} = useSubscription(UPDATE_DOG_DATE, {skip: true})

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  console.log(data)

  return <h2>dogDate state: {data.dogDateUpdate.state}</h2>
}

*/


function DogDateData() {
  const { loading, error, data, subscribeToMore } = useQuery(DOGDATE)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  const more = ()  =>   subscribeToMore({
    document: UPDATE_DOG_DATE,
    updateQuery: (prev, { subscriptionData }) => {
      console.log("updateQuery")

      if (!subscriptionData.data) return prev

      const dogDate = subscriptionData.data.dogDateUpdate

      return Object.assign({}, prev, {
        dogDate: dogDate,
        __typename: "DogDate"
      })

    }
  })

  console.log(data)
  return <DogDate subscribeToMore={more} data={data}/>
}

export default DogDateData


