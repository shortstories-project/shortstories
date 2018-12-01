import 'cross-fetch/polyfill'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { getDataFromTree, ApolloProvider } from 'react-apollo'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Page from '../components/Page'
import API_URL from '../config'

const createApolloClient = (cache = {}, headers) =>
  new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    cache: new InMemoryCache().restore(cache),
    link: createUploadLink({
      uri: API_URL,
      credentials: 'include',
      headers,
    }),
  })

class MyApp extends App {
  static async getInitialProps({ ctx, router, Component }) {
    let pageProps = {}

    if (Component.getInitialProps)
      pageProps = await Component.getInitialProps(ctx)

    if (ctx.req) {
      const apolloClient = createApolloClient(undefined, ctx.req.headers)
      try {
        await getDataFromTree(
          <MyApp
            {...pageProps}
            apolloClient={apolloClient}
            router={router}
            Component={Component}
          />
        )
      } catch (error) {
        console.error('getInitialProps error:', error)
      }
      Head.rewind()
      pageProps.apolloCache = apolloClient.cache.extract()
    }

    pageProps.query = ctx.query

    return { pageProps }
  }

  apolloClient =
    this.props.apolloClient ||
    createApolloClient(this.props.pageProps.apolloCache)

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <ApolloProvider client={this.apolloClient}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default MyApp
