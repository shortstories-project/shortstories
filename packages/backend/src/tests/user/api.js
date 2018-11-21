import axios from 'axios'
import { API_URL } from '../../constants'

export const signUp = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($username: String!, $email: String!, $password: String!) {
        signUp(username: $username, email: $email, password: $password) {
          id
          username
          email
          isVerified
        }
      }
  `,
    variables,
  })

export const signIn = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
          id
          username
          email
        }
      }
    `,
    variables,
  })
