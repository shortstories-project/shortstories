import * as React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { hot } from 'react-hot-loader'
import { injectGlobal } from 'styled-components'
import Router from './pages'
import store from './store'
import style from './style'

injectGlobal`${style}` // tslint:disable-line

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      'x-token': token || '',
    },
  }
})

const link = authLink.concat(httpLink)

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

class App extends React.PureComponent<any, any> {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ApolloProvider>
    )
  }
}

export default hot(module)(App)
