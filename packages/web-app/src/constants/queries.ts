import gql from 'graphql-tag'

/* Users */
export const GET_ME = gql`
  query {
    me {
      id
      username
      email
    }
  }
`
export const GET_USERS = gql`
  query {
    users {
      id
      username
      email
    }
  }
`
export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      email
    }
  }
`

/* Stories */
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
          }
          story {
            id
          }
        }
        dislikedBy {
          id
          user {
            id
          }
          story {
            id
          }
        }
        viewedBy {
          id
          user {
            id
          }
          story {
            id
          }
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
export const GET_STORY = gql`
  query Story($id: ID!) {
    story(id: $id) {
      id
      title
      body
      user {
        id
        username
      }
      likedBy {
        id
      }
      dislikedBy {
        id
      }
      viewedBy {
        id
      }
      comments {
        id
        body
        user {
          id
          username
        }
        story {
          id
        }
        createdAt
      }
      createdAt
    }
  }
`

/* Comments */
export const GET_COMMENTS = gql`
  query Comments($cursor: String) {
    comments(cursor: $cursor, limit: 10)
      @connection(key: "CommentsConnection") {
      id
      body
      user {
        username
      }
      story {
        id
      }
      createdAt
    }
  }
`
export const GET_COMMENT = gql`
  query Comment($id: ID!) {
    comment(id: $id) {
      id
      body
      user {
        username
      }
      story {
        id
      }
      createdAt
    }
  }
`
