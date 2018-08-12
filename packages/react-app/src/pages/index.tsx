import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { hot } from 'react-hot-loader'
import { store, history } from '../store'

class App extends React.PureComponent<any, any> {
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default hot(module)(App)
