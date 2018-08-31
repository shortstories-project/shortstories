import * as React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../logo'
import * as routes from '../../constants/routes'
import { signOut } from '../../utils/sign-out'

interface IProps {
  username: string
}

const Items = styled.div`
  > a {
    margin-left: 20px;
  }
`

const AuthNav = ({ username }: IProps) => (
  <>
    <NavLink to={routes.STORIES}>
      <Logo />
    </NavLink>
    <Items>
      <NavLink to={routes.CREATE_STORY}>Create Story</NavLink>
      <NavLink to={routes.ACCOUNT}>{username}</NavLink>
      <ApolloConsumer>
        {client => (
          <NavLink
            to="#"
            onClick={e => {
              e.preventDefault()
              signOut(client)
            }}
          >
            Sign Out
          </NavLink>
        )}
      </ApolloConsumer>
    </Items>
  </>
)

export default AuthNav
