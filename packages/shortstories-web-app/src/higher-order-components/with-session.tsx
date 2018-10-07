import * as React from 'react'
import { Query } from 'react-apollo'
import { GET_ME } from '../queries/user'

const withSession = (Component: React.ComponentType) => (props: any) => (
  <Query query={GET_ME}>
    {({ data, refetch }) => (
      <Component {...props} session={data} refetch={refetch} />
    )}
  </Query>
)

export default withSession
