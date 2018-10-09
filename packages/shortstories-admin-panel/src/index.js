import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { Route, Switch, Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import createHistory from 'history/createBrowserHistory'

import * as routes from './constants/routes'
import Enter from './scenes/enter/enter'
import SignIn from './scenes/sign-in'
import SignUp from './scenes/sign-up'
import CardsContent from './scenes/cards-content'

const history = createHistory()
const client = new ApolloClient({
  uri: '/graphql',
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <Switch>
        <Route exact path={routes.ENTER} component={Enter} />
        <Route exact path={routes.SIGN_IN} component={SignIn} />
        <Route exact path={routes.SIGN_UP} component={SignUp} />
        <Route exact path={routes.CARDS_CONTENT} component={CardsContent} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
