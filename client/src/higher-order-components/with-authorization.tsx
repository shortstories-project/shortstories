import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import * as routes from '../constants/routes'

const GET_ME = gql`
  {
    me {
      id
      username
      email
      role
    }
  }
`

const withAuthorization = (conditionFn: (data: any) => boolean) => (
  Component: React.ComponentType
) => (props: any) => (
  <Query query={GET_ME}>
    {({ data, networkStatus }) => {
      if (networkStatus < 7) {
        return null
      }

      return conditionFn(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to={routes.SIGN_IN} />
      )
    }}
  </Query>
)

export default withAuthorization
