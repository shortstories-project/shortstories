import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
import App from './app'
import style from './style'

injectGlobal`${style}` // tslint:disable-line

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
})

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'x-token': localStorage.getItem('token'),
    },
  })
  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const link = ApolloLink.from([authLink, errorLink, httpLink])

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

const AppWithApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

const AppWithHotLoader = hot(module)(AppWithApollo)

const root = document.getElementById('app')

ReactDOM.render(<AppWithHotLoader />, root)
