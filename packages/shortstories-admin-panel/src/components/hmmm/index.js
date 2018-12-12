import React from 'react'
import { Query } from 'react-apollo'
// import gql from 'graphql-tag';

import { GET_ME } from '../../constants/queries'

const Post = () => (
  <Query query={GET_ME}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      // return <div>{console.log('data', data)}</div>
    }}
  </Query>
)

export default Post
