import React from 'react'
import Match from './Match'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const MYMATCHS = gql`
{
  myMatchs{
    id
    rating
    state
    expiresAt
    deletedAt
    dogDate{
      id
      owner{
        fullName
      }
    }
  }
}
`

const UPDATE_MY_MATCHS = gql`
subscription{
  updateMyMatchs{
    id
    rating
    state
    expiresAt
    deletedAt
    dogDate{
      id
      owner{
        fullName
      }
    }
  }
}`


function Matchs(){

  const { loading, error, data, subscribeToMore } = useQuery(MYMATCHS)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  const more = ()  =>   subscribeToMore({
    document: UPDATE_MY_MATCHS,
    updateQuery: (prev, { subscriptionData }) => {
      console.log("update Matchs")
      if (!subscriptionData.data) return prev
      const changed = subscriptionData.data.updateMyMatchs
      return Object.assign({}, prev, {
        myMatchs: [...prev.myMatchs, changed],
        __typename: "DateMatch"
      })

    }
  })

  const myMatchs = [...new Map(data.myMatchs.map(o => [o.id, o])).values()] // remove duplicated

  return <Match subscribeToMore={more} data={myMatchs}/>
}


export default Matchs;