import React from 'react'
import Link from 'next/link'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import StoryStyles from './styles/StoryStyles'
import ToolsBar from './styles/ToolsBar'

const VIEW_MUTATION = gql`
  mutation VIEW_MUTATION($login: String!) {
    requestReset(login: $login) {
      email
    }
  }
`
const LIKE_MUTATION = gql`
  mutation LIKE_MUTATION($login: String!) {
    requestReset(login: $login) {
      email
    }
  }
`
const DISLIKE_MUTATION = gql`
  mutation DISLIKE_MUTATION($login: String!) {
    requestReset(login: $login) {
      email
    }
  }
`

const Story = ({ story }) => (
  <StoryStyles>
    <div className="author">
      <Link href={`/user?id=${story.user.id}`}>
        <a>
          <img
            className="avatar"
            src={story.user.photo || '/static/user-placeholder.png'}
            alt={story.user.username}
          />
        </a>
      </Link>
      <div className="name-and-date">
        <Link href={`/user?id=${story.user.id}`}>
          <a>{story.user.username}</a>
        </Link>
        <p>{format(+story.createdAt, 'MMMM D, YYYY')}</p>
      </div>
    </div>
    <h2 className="title">{story.title}</h2>
    <p className="body">{story.body}</p>
    <ToolsBar>
      <div className="buttons-container">
        <Mutation mutation={LIKE_MUTATION}>
          {() => (
            <div>
              <button type="button">
                <img src="/static/icons/like.svg" alt="like" />
              </button>
              <div>{story.likedBy.length}</div>
            </div>
          )}
        </Mutation>
        <Mutation mutation={DISLIKE_MUTATION}>
          {() => (
            <div>
              <button type="button">
                <img src="/static/icons/dislike.svg" alt="dislike" />
              </button>
              <div>{story.dislikedBy.length}</div>
            </div>
          )}
        </Mutation>
        <Mutation mutation={VIEW_MUTATION}>
          {() => (
            <div>
              <button type="button">
                <img src="/static/icons/view.svg" alt="view" />
              </button>
              <div>{story.viewedBy.length}</div>
            </div>
          )}
        </Mutation>
        <div>
          <button type="button">
            <img src="/static/icons/comment.svg" alt="comments" />
          </button>
          <div>{story.comments.length}</div>
        </div>
      </div>
    </ToolsBar>
  </StoryStyles>
)

Story.propTypes = {
  story: PropTypes.shape().isRequired,
}

export default Story
