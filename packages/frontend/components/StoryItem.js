import React, { Fragment } from 'react'
import Router from 'next/router'
import { withState } from 'recompose'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { func, bool, string, number, shape } from 'prop-types'
import filter from 'ramda/src/filter'
import EditingStoryModal from './EditingStoryModal'
import UserAndDate from './UserAndDate'
import StoryStyles from './styles/StoryStyles'
import ToolsBar from './styles/ToolsBar'
import { STORIES_QUERY } from './Stories'
import user from '../types/user'

const DELETE_STORY_MUTATION = gql`
  mutation DELETE_STORY_MUTATION($id: ID!) {
    deleteStory(id: $id) {
      id
    }
  }
`

function update(cache, payload) {
  const data = cache.readQuery({ query: STORIES_QUERY })
  data.stories.edges = filter(
    story => story.id !== payload.data.deleteStory.id,
    data.stories.edges
  )
  cache.writeQuery({
    query: STORIES_QUERY,
    data,
  })
}

function StoryItem({
  isStoryOwner = false,
  id,
  user,
  stats,
  createdAt,
  title,
  body,
  isOpenModal,
  toggleModal,
}) {
  return (
    <Fragment>
      <StoryStyles
        onClick={() => {
          Router.push(`/story?id=${id}`)
        }}
      >
        {isStoryOwner ? (
          <div className="edit-and-delete">
            <button
              type="button"
              onClick={event => {
                event.stopPropagation()
                toggleModal(true)
              }}
            >
              <img src="/static/icons/edit.svg" alt="Edit" />
            </button>
            <Mutation
              mutation={DELETE_STORY_MUTATION}
              variables={{ id }}
              update={update}
              optimisticResponse={{
                __typename: 'Mutation',
                deleteStory: {
                  __typename: 'Story',
                  id,
                },
              }}
            >
              {deleteStory => (
                <button
                  type="button"
                  onClick={event => {
                    event.stopPropagation()
                    deleteStory()
                  }}
                >
                  <img src="/static/icons/cross.svg" alt="Delete" />
                </button>
              )}
            </Mutation>
          </div>
        ) : (
          <UserAndDate user={user} date={createdAt} />
        )}
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
      {isOpenModal && (
        <EditingStoryModal
          isOpen={isOpenModal}
          toggle={toggleModal}
          id={id}
          title={title}
          body={body}
        />
      )}
    </Fragment>
  )
}

StoryItem.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  body: string.isRequired,
  createdAt: string.isRequired,
  user: user.isRequired,
  stats: shape({
    comments: number,
    likes: number,
    dislikes: number,
  }),
  isStoryOwner: bool.isRequired,
  isOpenModal: bool.isRequired,
  toggleModal: func.isRequired,
}

export default withState('isOpenModal', 'toggleModal', false)(StoryItem)
