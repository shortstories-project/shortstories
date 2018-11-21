import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import StoryStyles from './styles/StoryStyles'
import ToolsBar from './styles/ToolsBar'

const StoryItem = ({ story }) => (
  <StoryStyles
    onClick={e => {
      e.stopPropagation()
      Router.push(`/story?id=${story.id}`)
    }}
  >
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
        <div>
          <img src="/static/icons/like-fill.svg" alt="like" />
          <div>{story.likedBy.length}</div>
        </div>
        <div>
          <img src="/static/icons/dislike-fill.svg" alt="dislike" />
          <div>{story.dislikedBy.length}</div>
        </div>
        <div>
          <img src="/static/icons/comment-fill.svg" alt="comments" />
          <div>{story.comments.length}</div>
        </div>
      </div>
    </ToolsBar>
  </StoryStyles>
)

StoryItem.propTypes = {
  story: PropTypes.shape().isRequired,
}

export default StoryItem
