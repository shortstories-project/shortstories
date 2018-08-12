import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { injectGlobal } from 'styled-components'
import Auth from './auth'
import Main from './main'
import { store, history } from '../store'

/* tslint:disable */
injectGlobal`
  :root {
    font-size: 16px;
    --yellow: #ffc600;
    --black: #272727;
    --white: #ffffff;
    --purple: #6d47d9;
  }

  html {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 900;
    color: var(--black);
  }

  body {
    background-image: url("src/assets/images/topography.svg"),
      linear-gradient(110deg, #f93d66, var(--purple));
    background-size: 340px, auto;
    background-repeat: repeat;
    min-height: calc(100vh);
    background-attachment: fixed;
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    padding: 0;
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
/* tslint:enable */

class App extends React.PureComponent<any, any> {
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route exact path="/" render={() => <Auth />} />
              <Route exact path="/main" render={() => <Main />} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default hot(module)(App)
