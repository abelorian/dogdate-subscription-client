import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import DogDate from './DogDate'



const MY_DOGLOVER_DATES = gql`
{
  myDogloverDates{
    id
    state
    startsAt
    updatedAt
  }
}
`

const UPDATE_DOG_DATE = gql`
  subscription {
    dogDate {
      id
      state
      startsAt
      updatedAt
    }
  }
`
function MyDogloverDates(){
  const { loading, error, data, subscribeToMore } = useQuery(MY_DOGLOVER_DATES)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  const more = ()  =>   subscribeToMore({
    document: UPDATE_DOG_DATE,
    updateQuery: (prev, { subscriptionData }) => {
      console.log("update myDogloverDates")

      if (!subscriptionData.data) return prev

      const dogDate = subscriptionData.data.dogDate

      return Object.assign({}, prev, {
        myDogloverDates: [...prev.myDogloverDates, dogDate],
        __typename: "DogDate"
      })

    }
  })

  const dogDates = [...new Map(data.myDogloverDates.map(o => [o.id, o])).values()] // remove duplicated

  return <div>
      <h2>My dog lover dates</h2>
      <DogDate data={dogDates} subscribeToMore={more}/>
    </div>
}


export default MyDogloverDates