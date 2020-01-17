import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import DogDate from './DogDate'



const MY_DOG_DATES = gql`
{
  myDogDates{
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
function MyDogDates(){
  const { loading, error, data, subscribeToMore } = useQuery(MY_DOG_DATES)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  const more = ()  =>   subscribeToMore({
    document: UPDATE_DOG_DATE,
    updateQuery: (prev, { subscriptionData }) => {
      console.log("update MyDogDates")

      if (!subscriptionData.data) return prev

      const dogDate = subscriptionData.data.dogDate

      return Object.assign({}, prev, {
        myDogDates: [...prev.myDogDates, dogDate],
        __typename: "DogDate"
      })

    }
  })

  const dogDates = [...new Map(data.myDogDates.map(o => [o.id, o])).values()] // remove duplicated

  return <div>
      <h2>My dog dates</h2>
      <DogDate data={dogDates} subscribeToMore={more}/>
    </div>
}


export default MyDogDates