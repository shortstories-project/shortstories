import gql from 'graphql-tag'

export const GET_STORIES = gql`
  fragment Author on User {
    id
    username
    email
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
            id
            username
          }
          storyId
        }
        dislikedBy {
          id
          user {
            id
            username
          }
          storyId
        }
        viewedBy {
          id
          user {
            id
            username
          }
          storyId
        }
        comments {
          id
          body
          user {
            ...Author
          }
          story {
            id
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
export const GET_ME = gql`
  query {
    me {
      id
      username
      email
    }
  }
`
