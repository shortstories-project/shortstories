import * as React from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import * as routes from '../constants/routes'
import { GET_ME } from '../queries/user'

const withAuthorization = (Component: React.ComponentType) => (props: any) => (
  <Query query={GET_ME}>
    {({ data, networkStatus }) => {
      if (networkStatus < 7) {
        return null
      }
      return data.me ? (
        <Component {...props} />
      ) : (
        <Redirect to={routes.SIGN_IN} />
      )
    }}
  </Query>
)

export default withAuthorization
