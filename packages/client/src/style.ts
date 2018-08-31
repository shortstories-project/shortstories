export default `
:root {
  font-size: 16px;
  --yellow: #ffc600;
  --black: #272727;
  --white: #ffffff;
  --purple: #6d47d9;
}

a {
  text-decoration: none;
  color: var(--black);
}

html {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 900;
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--black);
}

body {
  font-size: 1rem;
  letter-spacing: -1px;
  margin: 0;
  padding: 0;
}

#app {
  background-image: url(src/assets/images/topography.svg), linear-gradient(110deg,#38adae,#cd295a);
  background-size: 340px,auto;
  background-repeat: repeat;
  background-attachment: fixed;
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
`
