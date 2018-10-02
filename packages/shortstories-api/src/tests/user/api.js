import axios from 'axios'
import { API_URL } from '../../constants'

export const signUp = async variables => axios.post(API_URL, {
  query: `
    mutation ($username: String!, $email: String!, $password: String!) {
      signUp(username: $username, email: $email, password: $password) {
        id
        username
        email
      }
    }
  `,
  variables,
})

export const signIn = async variables => axios.post(API_URL, {
  query: `
    mutation ($login: String!, $password: String!) {
      signUp(login: $login, password: $password) {
        id
        username
        email
      }
    }
  `,
  variables,
})
