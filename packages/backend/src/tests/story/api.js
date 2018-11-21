import axios from 'axios'
import gql from 'graphql-tag'
import { API_URL } from '../../constants'

export const createStory = async variables => axios.post(API_URL, {
  query: gql`
    mutation ($title: String!, $body: String!) {
      createStory(title: $title, body: $body) {
        id
        title
        body
        user
        likedBy
        dislikedBy
        viewedBy
        comments
        createdAt
      }
    }
  `,
  variables,
})
