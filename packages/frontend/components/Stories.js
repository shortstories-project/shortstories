import React from 'react'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import BigLoader from './BigLoader'
import StoriesGrid from './StoriesGrid'

export const STORIES_QUERY = gql`
  query STORIES_QUERY(
    $cursor: String
    $limit: Int
    $userId: ID
    $isLiked: Boolean
  ) {
    stories(cursor: $cursor, limit: $limit, userId: $userId, isLiked: $isLiked)
      @connection(key: "StoriesConnection") {
      edges {
        id
        title
        body
        user {
          ...author
        }
        stats {
          likes
          dislikes
          comments
        }
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  fragment author on User {
    id
    username
    photo
  }
`

function Stories() {
  return (
    <Query query={STORIES_QUERY}>
      {({ data: { stories }, loading, error, fetchMore }) => {
        if (loading) return <BigLoader />
        if (error) return <p>Error: {error.message}</p>
        if (!stories.edges.length)
          return (
            <div>
              <h2>No stories yet</h2>
              <Link href="/create-story">
                <a>
                  Be the first{' '}
                  <span role="img" aria-label="fire">
                    🔥
                  </span>
                </a>
              </Link>
            </div>
          )
        return <StoriesGrid {...stories} fetchMore={fetchMore} />
      }}
    </Query>
  )
}

export default Stories
