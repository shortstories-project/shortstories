import * as React from 'react'
import { ApolloConsumer } from 'react-apollo'
import history from '../../constants/history'
import * as routes from '../../constants/routes'

export const signOut = (client: any) => {
  localStorage.setItem('token', '')
  client.resetStore()
  history.push(routes.SIGN_IN)
}

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <button type="button" onClick={() => signOut(client)}>
        Sign Out
      </button>
    )}
  </ApolloConsumer>
)

export default SignOutButton
