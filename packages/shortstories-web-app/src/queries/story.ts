import gql from 'graphql-tag'

export const GET_STORIES = gql`
  fragment Author on User {
    id
    username
  }

  query Stories($cursor: String) {
    stories(cursor: $cursor, limit: 100) @connection(key: "StoriesConnection") {
      edges {
        id
        title
        body
        user {
          ...Author
        }
        likedBy {
          id
          user {
            ...Author
          }
        }
        dislikedBy {
          id
          user {
            ...Author
          }
        }
        viewedBy {
          id
          user {
            ...Author
          }
        }
        comments {
          id
          body
          user {
            ...Author
          }
          createdAt
        }
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
