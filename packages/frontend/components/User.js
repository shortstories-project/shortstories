import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      username
      email
      isVerified
      photo
      writtenStories {
        id
        body
        title
        user {
          id
          username
          photo
        }
        likedBy {
          id
          userId
        }
        dislikedBy {
          id
          userId
        }
        comments {
          id
          body
          user {
            id
            username
          }
          createdAt
        }
        createdAt
      }
      likedStories {
        id
        body
        title
        user {
          id
          username
          photo
        }
        likedBy {
          id
          userId
        }
        dislikedBy {
          id
          userId
        }
        comments {
          id
          body
          user {
            id
            username
          }
          createdAt
        }
        createdAt
      }
    }
  }
`

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
)

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User
export { CURRENT_USER_QUERY }
