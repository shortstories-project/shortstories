import gql from 'graphql-tag'

export const CREATE_STORY = gql`
  mutation createStory($title: String!, $body: String!) {
    createStory(title: $title, body: $body) {
      id
    }
  }
`
