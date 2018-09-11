import * as React from 'react'
import idx from 'idx'
import styled from 'styled-components'
import { GridContainer, GridRow, GridColumn } from '../grid'
import AuthNav from './auth-nav'
import NonAuthNav from './non-auth-nav'
import throttle from '../../utils/throttle'
import { IUser } from '../../interfaces/user'

interface IProps {
  session?: {
    me: IUser
  }
}

const StyledHeader = styled.header`
  position: sticky;
  will-change: transform;
  top: 0;
  background: transparent;
  z-index: 999999;
  box-shadow: 0 0.0625em 0.5em rgba(0, 0, 0, 0.3);
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`

class Header extends React.Component<IProps> {
  public componentDidMount() {
    window.addEventListener('scroll', throttle(this.onScroll, 25))
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.onScroll, 25))
  }

  public onScroll = () => {
    const header = document.querySelector('header')
    if (window.pageYOffset) {
      header.classList.add('is-active')
    } else {
      header.classList.remove('is-active')
    }
  }

  public render() {
    const { session } = this.props
    return (
      <StyledHeader>
        <GridContainer>
          <GridRow>
            <GridColumn>
              <Nav>
                {idx(session, _ => _.me) ? <AuthNav /> : <NonAuthNav />}
              </Nav>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </StyledHeader>
    )
  }
}

export default Header
