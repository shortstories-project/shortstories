import * as React from 'react'
import idx from 'idx'
import styled from 'styled-components'
import { GridContainer, GridRow, GridColumn } from '../grid'
import AuthNav from './auth-nav'
import NonAuthNav from './non-auth-nav'
import { IUser } from '../../interfaces/user'

interface IProps {
  session?: {
    me: IUser
  }
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`

const Header = ({ session }: IProps) => (
  <header>
    <GridContainer>
      <GridRow>
        <GridColumn>
          <Nav>
            {idx(session, _ => _.me) ? (
              <AuthNav username={session.me.username} />
            ) : (
              <NonAuthNav />
            )}
          </Nav>
        </GridColumn>
      </GridRow>
    </GridContainer>
  </header>
)

export default Header
