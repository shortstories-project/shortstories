import normalizeCSS from 'styled-normalize'

export default `
  ${normalizeCSS}

  :root {
    font-size: 16px;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #fffaea;
  }

  * {
    font-family: 'PT Sans', sans-serif;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .AuthModal {
    position: absolute;
    top: 200px;
    left: 40%;
    right: 40%;
    bottom: 200px;
    border: 1px solid rgb(204, 204, 204);
    background: rgb(255, 255, 255);
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 20px;
    height: 140px;
    min-width: 350px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .OverlayAuthModal {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.6);
  }
`
