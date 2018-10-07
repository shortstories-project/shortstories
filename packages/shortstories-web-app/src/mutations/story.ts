import gql from 'graphql-tag'

export const CREATE_STORY = gql`
  mutation createStory($title: String!, $body: String!) {
    createStory(title: $title, body: $body) {
      id
    }
  }
`

export const LIKE_STORY = gql`
  mutation likeStory($id: ID!) {
    likeStory(id: $id) {
      id
      state
      user {
        id
        username
      }
      storyId
    }
  }
`

export const DISLIKE_STORY = gql`
  mutation dislikeStory($id: ID!) {
    dislikeStory(id: $id) {
      id
      state
      user {
        id
        username
      }
      storyId
    }
  }
`

export const VIEW_STORY = gql`
  mutation viewStory($id: ID!) {
    viewStory(id: $id) {
      id
      user {
        id
        username
      }
      storyId
    }
  }
`
