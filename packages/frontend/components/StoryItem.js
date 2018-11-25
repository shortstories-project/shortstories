import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import StoryStyles from './styles/StoryStyles'
import ToolsBar from './styles/ToolsBar'

function StoryItem({ story, index }) {
  const toUser = e => {
    e.stopPropagation()
    Router.push(`/user?id=${story.user.id}`)
  }
  return (
    <StoryStyles
      onClick={() => {
        Router.push(`/story?id=${story.id}`)
      }}
    >
      <div
        tabIndex={index}
        role="link"
        className="author"
        onClick={toUser}
        onKeyUp={toUser}
        onKeyDown={toUser}
        onKeyPress={toUser}
      >
        <img
          className="avatar"
          src={story.user.photo || '/static/user-placeholder.png'}
          alt={story.user.username}
        />
        <div className="name-and-date">
          <span className="name">{story.user.username}</span>
          <span className="date">
            {format(+story.createdAt, 'MMM D, YYYY')}
          </span>
        </div>
      </div>
      <h2 className="title">{story.title}</h2>
      <p className="body">{story.body}</p>
      <ToolsBar>
        <div className="buttons-container">
          <div>
            <img src="/static/icons/like-fill-gray.svg" alt="like" />
            <span>{story.likedBy.length}</span>
          </div>
          <div>
            <img src="/static/icons/dislike-fill-gray.svg" alt="dislike" />
            <span>{story.dislikedBy.length}</span>
          </div>
          <div>
            <img src="/static/icons/comment-fill-gray.svg" alt="comments" />
            <span>{story.comments.length}</span>
          </div>
        </div>
      </ToolsBar>
    </StoryStyles>
  )
}

StoryItem.propTypes = {
  story: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
}

export default StoryItem
