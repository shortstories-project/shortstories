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

export const CHECK_USER_EXIST = gql`
  mutation checkUserExist($login: String!) {
    checkUserExist(login: $login)
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

export const SIGN_OUT = gql`
  mutation signOut {
    signOut {
      id
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($username: String!) {
    updateUser(username: $username) {
      id
      username
    }
  }
`

export const POST_PHOTO = gql`
  mutation postPhoto(
    $file: Upload!
    $width: Float!
    $height: Float!
    $x: Float!
    $y: Float!
  ) {
    postPhoto(file: $file, width: $width, height: $height, x: $x, y: $y) {
      avatar
    }
  }
`

export const VERIFY_USER = gql`
  mutation verifyUser($token: String!) {
    verifyUser(token: $token)
  }
`

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($login: String!) {
    forgotPassword(login: $login)
  }
`
