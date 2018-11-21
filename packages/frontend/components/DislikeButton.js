import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { SINGLE_STORY_QUERY } from './SingleStory'

const DISLIKE_MUTATION = gql`
  mutation DISLIKE_MUTATION($id: ID!) {
    dislikeStory(id: $id) {
      id
      state
      userId
      storyId
    }
  }
`

function DislikeButton({ id, qty, isDisliked }) {
  const icon = isDisliked
    ? '/static/icons/dislike-fill.svg'
    : '/static/icons/dislike.svg'
  return (
    <Mutation
      mutation={DISLIKE_MUTATION}
      variables={{ id }}
      refetchQueries={[{ query: SINGLE_STORY_QUERY, variables: { id } }]}
    >
      {dislikeStory => (
        <div>
          <button
            type="button"
            onClick={() => {
              dislikeStory()
            }}
          >
            <img src={icon} alt="dislike" />
          </button>
          <div>{qty}</div>
        </div>
      )}
    </Mutation>
  )
}

DislikeButton.propTypes = {
  id: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  isDisliked: PropTypes.bool.isRequired,
}

export default DislikeButton
