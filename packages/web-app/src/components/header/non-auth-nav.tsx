import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../logo'
import * as routes from '../../constants/routes'

const Items = styled.div`
  > a {
    margin-left: 20px;
  }
`

const NonAuthNav = () => (
  <>
    <NavLink to={routes.STORIES}>
      <Logo />
    </NavLink>
    <Items>
      <NavLink to={routes.SIGN_IN}>Sign In</NavLink>
      <NavLink to={routes.SIGN_UP}>Sign Up</NavLink>
    </Items>
  </>
)

export default NonAuthNav
