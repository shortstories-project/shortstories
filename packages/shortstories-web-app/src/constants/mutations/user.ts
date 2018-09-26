import gql from 'graphql-tag'

export const SIGN_UP = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`

export const SIGN_IN = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      id
      username
      email
    }
  }
`

export const CHECK_USER_EXIST = gql`
  mutation checkUserExist($login: String!) {
    checkUserExist(login: $login)
  }
`
