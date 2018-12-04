import React, { Fragment } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { withState } from 'recompose'
import { Mutation } from 'react-apollo'
import TextareaAutosize from 'react-textarea-autosize'
import { Formik } from 'formik'
import Modal from 'react-modal'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import Button from './Button'
import Error from './ErrorMessage'
import StoryStyles from './styles/StoryStyles'
import ToolsBar from './styles/ToolsBar'
import getPhoto from '../lib/get-photo'
import { validate } from './StoryCreator'

const EDIT_STORY_MUTATION = gql`
  mutation EDIT_STORY_MUTATION($id: ID!, $body: String!, $title: String!) {
    updateStory(id: $id, body: $body, title: $title) {
      id
      title
      body
    }
  }
`

const DELETE_STORY_MUTATION = gql`
  mutation DELETE_STORY_MUTATION($id: ID!) {
    deleteStory(id: $id)
  }
`

const EditForm = styled.form`
  border-radius: 4px;
  width: 50%;
  min-width: 320px;
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title-block {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    input {
      width: 100%;
      padding: 10px 20px;
      font-size: 2.4rem;
      font-family: 'Alegreya', serif;
      color: #272727;
      outline: none;
      border: 3px solid gainsboro;
      margin-bottom: 4px;
    }
  }

  .body-block {
    margin-bottom: 10px;
    textarea {
      font-size: 1.6rem;
      font-family: 'Alegreya', serif;
      line-height: 1.4;
      border: 3px solid gainsboro;
      color: #272727;
      width: 100%;
      padding: 10px 20px;
      outline: none;
      resize: none;
      min-height: 300px;
      max-height: 500px;
      overflow: scroll;
    }
  }

  .error-message {
    color: #ff0000;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .buttons-block {
    width: 100%;
    button {
      width: calc((100% - 20px) / 2);
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    border: 'none',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 999,
  },
  body: {
    overflowY: 'hidden',
  },
}

if (process.browser) {
  Modal.setAppElement('#__next')
}

const StoryItem = withState('isOpenModal', 'toggleModal', false)(
  ({
    isStoryOwner = false,
    id,
    user,
    stats,
    createdAt,
    title,
    body,
    index,
    isOpenModal,
    toggleModal,
  }) => {
    const toUser = e => {
      e.stopPropagation()
      Router.push(`/user?id=${user.id}`)
    }
    return (
      <Fragment>
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
          {isStoryOwner ? (
            <div className="edit-and-delete">
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation()
                  toggleModal(true)
                }}
              >
                <img src="/static/icons/edit.svg" alt="Edit" />
              </button>
              <Mutation mutation={DELETE_STORY_MUTATION} variables={{ id }}>
                {deleteStory => (
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      deleteStory()
                    }}
                  >
                    <img src="/static/icons/cross.svg" alt="Delete" />
                  </button>
                )}
              </Mutation>
            </div>
          ) : (
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
        <Modal
          onRequestClose={e => {
            e.stopPropagation()
            toggleModal(false)
          }}
          isOpen={isOpenModal}
          style={customStyles}
        >
          <Mutation mutation={EDIT_STORY_MUTATION}>
            {(editStory, { loading, error }) => (
              <Formik
                isInitialValid={false}
                initialValues={{
                  title,
                  body,
                }}
                onSubmit={values => {
                  editStory({ variables: { ...values, id } }).then(() => {
                    toggleModal(false)
                  })
                }}
                validate={validate}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                }) => (
                  <EditForm onSubmit={handleSubmit}>
                    <Error error={error} />
                    <div className="title-block">
                      <input
                        placeholder="Title"
                        type="text"
                        name="title"
                        id="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.title && touched.title && (
                        <span className="error-message">{errors.title}</span>
                      )}
                    </div>
                    <div className="body-block">
                      <TextareaAutosize
                        placeholder="Where is your mind?"
                        name="body"
                        id="body"
                        value={values.body}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.body && touched.body && (
                        <span className="error-message">{errors.body}</span>
                      )}
                    </div>
                    <div className="buttons-block">
                      <Button loading={loading} type="submit">
                        Save
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          toggleModal(false)
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </EditForm>
                )}
              </Formik>
            )}
          </Mutation>
        </Modal>
      </Fragment>
    )
  }
)

StoryItem.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isStoryOwner: PropTypes.bool.isRequired,
}

export default StoryItem
