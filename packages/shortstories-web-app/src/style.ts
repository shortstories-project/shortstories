import { css } from 'styled-components'
import { darken } from 'polished'

export default css`
  :root {
    font-size: 16px;
    --yellow: #ffc600;
    --black: #272727;
    --white: #fcfcfc;
    --purple: #6d47d9;
    --pink: #f93d66;
    --main-font: 'Montserrat', sans-serif;
    --description-font-size: 12px;
    --logo-font-size: 32px;
    --header-default-height: 80px;
    --main-bg: url(/assets/images/topography.svg),
      linear-gradient(110deg, var(--pink), var(--purple));
  }

  * {
    outline: none;
  }

  #app {
    background-image: var(--main-bg);
    background-size: 340px, auto;
    background-repeat: repeat;
    background-attachment: fixed;
    min-height: 100vh;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--main-font);
    margin: 0 0 5px 0;
  }

  p {
    font-family: var(--main-font);
    font-size: 1rem;
    color: var(--black);
    line-height: normal;
  }

  a {
    font-family: var(--main-font);
    font-size: 1rem;
    color: var(--purple);
    text-decoration: none;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${darken(0.3, '#6d47d9')};
    }
  }

  span,
  div {
    font-family: var(--main-font);
    color: var(--black);
  }

  img,
  embed,
  object,
  video {
    max-width: 100%;
  }

  .navbar {
    min-height: 72px;
    background-image: var(--main-bg);
    background-size: 340px, auto;
    background-repeat: repeat;
    background-attachment: fixed;
  }

  .navbar-burger {
    height: 72px;
  }

  .navbar.has-shadow {
    box-shadow: 0 1px 16px rgba(0, 0, 0, 0.25);
  }
`
