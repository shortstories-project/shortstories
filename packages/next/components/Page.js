import React from 'react'
import { withRouter } from 'next/router'
import styled, {
  ThemeProvider,
  createGlobalStyle,
  css,
} from 'styled-components'
import Header from './Header'
import Meta from './Meta'

const theme = {
  yellow: '#ffc600',
  black: '#272727',
  white: '#fcfcfc',
  purple: '#6d47d9',
  pink: '#f93d66',
  red: '#ff0000',
  maxWidth: '1000px',
  bs: '0 1px 16px rgba(0, 0, 0, 0.25)',
}

const StyledPage = styled.div`
  background-image: url('/static/topography.svg'),
    linear-gradient(
      110deg,
      ${props => props.theme.pink},
      ${props => props.theme.purple}
    );
  background-size: 340px, auto;
  background-repeat: repeat;
  background-attachment: fixed;
  color: ${props => props.theme.black};
  min-height: 100vh;
`

const Inner = styled.div`
  ${props =>
    props.withHeader
      ? css`
          max-width: ${props.theme.maxWidth};
          margin: 0 auto;
          padding: 2rem;
        `
      : css`
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `};
`

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: url('/static/montserrat-medium.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pacifico';
    src: url('/static/pacifico-regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  a {
    text-decoration: none;
    color: ${theme.purple};
  }

  button {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

const pagesWithoutHeader = ['/signin', '/signup', '/request-reset']

const Page = ({ children, router }) => {
  const withHeader = !pagesWithoutHeader.includes(router.asPath)
  return (
    <>
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          {withHeader && <Header />}
          <Inner withHeader={withHeader}>{children}</Inner>
        </StyledPage>
      </ThemeProvider>
      <GlobalStyle />
    </>
  )
}

export default withRouter(Page)
