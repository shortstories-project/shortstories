import gql from 'graphql-tag'

/* Index */
export const SIGN_UP = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      id
      username
      email
    }
  }
`
export const SIGN_IN = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
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
export const UPDATE_ACCOUNT = gql`
  mutation updateAccount($username: String!) {
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

/* Story */
export const CREATE_STORY = gql`
  mutation createStory($title: String!, $body: String!) {
    createStory(title: $title, body: $body) {
      id
      title
      body
      user {
        username
      }
    }
  }
`
export const EDIT_STORY = gql`
  mutation editStory($id: ID!, $title: String, $body: String) {
    updateStory(id: $id, title: $title, body: $body) {
      id
      title
      body
    }
  }
`
export const DELETE_STORY = gql`
  mutation deleteStory($id: ID!) {
    deleteStory(id: $id)
  }
`
export const LIKE_STORY = gql`
  mutation likeStory($id: ID!) {
    likeStory(id: $id) {
      id
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

/* Comment */
export const WRITE_COMMENT = gql`
  mutation writeComment($body: String!, $id: ID!) {
    createComment(body: $body, id: $id) {
      id
      body
      user {
        username
      }
    }
  }
`

export const EDIT_COMMENT = gql`
  mutation editComment($id: ID!, $body: String!) {
    updateComment(id: $id, body: $body) {
      id
      body
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id)
  }
`
