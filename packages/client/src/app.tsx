import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { injectGlobal } from 'styled-components'
import { Auth, CreateStory, Main, NotFound, Profile, Story, User } from 'pages'
import { store, history } from './store'
import style from './style'

/* tslint:disable */
injectGlobal`${style}`
/* tslint:enable */

class App extends React.PureComponent<any, any> {
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/auth" component={Auth} />
              <Route path="/create-story" component={CreateStory} />
              <Route path="/profile" component={Profile} />
              <Route path="/story/:id" component={Story} />
              <Route path="/user/:id" component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default hot(module)(App)
