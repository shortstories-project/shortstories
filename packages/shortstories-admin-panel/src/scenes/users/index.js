import * as React from 'react'
import { Query } from 'react-apollo'
import { GET_STORIES } from '../../constants/queries'

const Stories = () => (
  <Query query={GET_STORIES}>
    {({ data, loading }) => {
      const { stories } = data

      if (loading || !stories) {
        return <p>loading...</p>
      }
    }}
  </Query>
)

export default Stories
