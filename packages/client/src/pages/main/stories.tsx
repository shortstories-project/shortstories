import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_STORIES = gql`
  query($cursor: String) {
    stories(cursor: $cursor, limit: 1) @connection(key: "StoriesConnection") {
      edges {
        id
        title
        body
        createdAt
        user {
          id
          username
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

const StoriesList = ({ stories, onLoadMore, hasNextPage }: any) => (
  <div>
    {stories.map((s: any) => (
      <div style={{ background: 'white' }}>
        <h2>{s.title}</h2>
        {s.body.split('\n').map((p: any) => (
          <p>{p}</p>
        ))}
      </div>
    ))}
    {hasNextPage && <button onClick={onLoadMore}>more</button>}
  </div>
)

const Stories = () => (
  <Query query={GET_STORIES}>
    {({ data, loading, fetchMore }) => {
      const { stories } = data

      if (loading || !stories) {
        return <p>loading...</p>
      }

      const { edges, pageInfo } = stories
      return (
        <StoriesList
          stories={edges}
          hasNextPage={pageInfo.hasNextPage}
          onLoadMore={() =>
            fetchMore({
              variables: {
                cursor: pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return previousResult
                }

                return {
                  stories: {
                    ...fetchMoreResult.stories,
                    edges: [
                      ...previousResult.stories.edges,
                      ...fetchMoreResult.stories.edges,
                    ],
                  },
                }
              },
            })
          }
        />
      )
    }}
  </Query>
)

export default Stories
