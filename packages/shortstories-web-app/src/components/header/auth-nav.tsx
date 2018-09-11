import * as React from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../logo'
import * as routes from '../../constants/routes'
import history from '../../constants/history'

interface IProps {
  username: string
}

const SIGN_OUT = gql`
  mutation {
    signOut {
      id
    }
  }
`

const Items = styled.div`
  > a {
    margin-left: 20px;
  }
`

const AuthNav = () => (
  <Mutation mutation={SIGN_OUT}>
    {signOut => (
      <>
        <NavLink to={routes.STORIES}>
          <Logo />
        </NavLink>
        <Items>
          <NavLink to={routes.CREATE_STORY}>Create Story</NavLink>
          <NavLink to={routes.ACCOUNT}>Account</NavLink>
          <ApolloConsumer>
            {client => (
              <NavLink
                to="#"
                onClick={e => {
                  e.preventDefault()
                  signOut()
                  client.resetStore()
                  history.push(routes.SIGN_IN)
                }}
              >
                Sign Out
              </NavLink>
            )}
          </ApolloConsumer>
        </Items>
      </>
    )}
  </Mutation>
)

export default AuthNav
