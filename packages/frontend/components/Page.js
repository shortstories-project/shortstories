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
  purple: '#fc67fa',
  purpleDark: '#6d47d9',
  pink: '#f4c4f3',
  red: '#ff0000',
  grey: '#dcdcdc',
  darkGrey: '#aaaaaa',
  lightGrey: '#eeeeee',
  maxWidth: '1200px',
  bs: '0 1px 16px rgba(0, 0, 0, 0.25)',
}

const StyledPage = styled.div`
  ${props =>
    props.isSingleStory
      ? css`
          background-color: #fff;
          > div {
            height: auto;
          }
        `
      : css`
          position: relative;
          overflow: hidden;
          min-height: 100%;
          &::before {
            content: '';
            background-image: url('/static/topography.svg');
            background-color: ${theme.lightGrey};
            background-size: 300px, auto;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            will-change: transform;
            z-index: -1;
          }
        `};
  color: ${props => props.theme.black};
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
  html {
    box-sizing: border-box;
    font-size: 10px;
    height: 100%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-size: 1.5rem;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  a {
    text-decoration: none;
    color: #6d47d9;
    font-weight: bold;
  }

  button {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  p {
    margin: 0;
  }

  .ReactModal__Body--open {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
  }
`

const pagesWithoutHeader = [
  '/signin',
  '/signup',
  '/request-reset',
  '/reset',
  '/verify',
]

const Page = ({ children, router }) => {
  const withHeader = !pagesWithoutHeader.includes(router.route)
  const isSingleStory = router.route === '/story'
  return (
    <>
      <ThemeProvider theme={theme}>
        <StyledPage isSingleStory={isSingleStory}>
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
