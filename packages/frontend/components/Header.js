import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'
import NProgress from 'nprogress'
import Nav from './Nav'

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

const Logo = styled.h1`
  font-family: 'Pacifico';
  font-size: 3.5rem;
  letter-spacing: -1.5px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;

  a {
    padding: 0.5rem 1rem;
    color: black;
    text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
`

const StyledHeader = styled.header`
  .bar {
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
  }
`

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Shortstories</a>
        </Link>
      </Logo>
      <Nav />
    </div>
  </StyledHeader>
)

export default Header
