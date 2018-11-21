import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { SINGLE_STORY_QUERY } from './SingleStory'

const LIKE_MUTATION = gql`
  mutation LIKE_MUTATION($id: ID!) {
    likeStory(id: $id) {
      id
      state
      userId
      storyId
    }
  }
`

function LikeButton({ id, qty, isLiked }) {
  const icon = isLiked
    ? '/static/icons/like-fill.svg'
    : '/static/icons/like.svg'
  return (
    <Mutation
      mutation={LIKE_MUTATION}
      variables={{ id }}
      refetchQueries={[{ query: SINGLE_STORY_QUERY, variables: { id } }]}
    >
      {likeStory => (
        <div>
          <button
            type="button"
            onClick={() => {
              likeStory()
            }}
          >
            <img src={icon} alt="like" />
          </button>
          <div>{qty}</div>
        </div>
      )}
    </Mutation>
  )
}

LikeButton.propTypes = {
  id: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
}

export default LikeButton
