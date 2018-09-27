import { css } from 'styled-components'

export default css`
  :root {
    font-size: 16px;
    --yellow: #ffc600;
    --black: #272727;
    --white: #ffffff;
    --purple: #6d47d9;
    --pink: #f93d66;
  }

  a {
    text-decoration: none;
    color: var(--black);
  }

  html {
    height: 100%;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    font-weight: 900;
    text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--black);
  }

  body {
    min-height: 100%;
    font-size: 1rem;
    letter-spacing: -1px;
    margin: 0;
    padding: 0;
  }

  #app {
    background-image: url(src/assets/images/topography.svg),
      linear-gradient(110deg, var(--pink), var(--purple));
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
    margin: 0 0 5px 0;
  }

  p {
    font-size: 1rem;
    color: var(--black);
  }

  .story-in-grid {
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: center;
    padding: 20px;
  }

  .story-in-grid h3 {
    color: var(--black);
    font-weight: 600;
  }

  .story-in-grid p {
    color: #333;
    font-weight: normal;
    text-shadow: none;
  }

  .story-full {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #ffffffa0;
    color: white;
    padding: 40px;
    font-weight: 100;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .story-full h1 {
    color: var(--black);
    font-size: 36px;
    font-weight: 600;
    margin: 0;
    padding: 0;
    max-width: 250px;
  }

  .story-full p {
    color: #333;
    text-shadow: none;
    margin: 0;
    padding-top: 15px;
  }

  .story-full__close {
    position: absolute;
    cursor: pointer;
    user-select: none;
    top: 40px;
    right: 40px;
    font-size: 26px;
    color: #000;
  }
`
