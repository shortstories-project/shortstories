import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import StoryStyles from './styles/StoryStyles'
import ToolsBar from './styles/ToolsBar'
import getPhoto from '../lib/get-photo'

function StoryItem({ id, user, stats, createdAt, title, body, index }) {
  const toUser = e => {
    e.stopPropagation()
    Router.push(`/user?id=${user.id}`)
  }
  return (
    <StoryStyles
      onClick={() => {
        Router.push({
          pathname: '/story',
          query: {
            id,
          },
        })
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
          src={getPhoto(user.photo)}
          alt={user.username}
        />
        <div className="name-and-date">
          <span className="name">{user.username}</span>
          <span className="date">{format(createdAt, 'MMM D, YYYY')}</span>
        </div>
      </div>
      <h2 className="title">{title}</h2>
      <p className="body">{body}</p>
      <ToolsBar>
        <div className="buttons-container">
          <div>
            <img src="/static/icons/like-fill-gray.svg" alt="like" />
            <span>{stats.likes}</span>
          </div>
          <div>
            <img src="/static/icons/dislike-fill-gray.svg" alt="dislike" />
            <span>{stats.dislikes}</span>
          </div>
          <div>
            <img src="/static/icons/comment-fill-gray.svg" alt="comments" />
            <span>{stats.comments}</span>
          </div>
        </div>
      </ToolsBar>
    </StoryStyles>
  )
}

StoryItem.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default StoryItem
