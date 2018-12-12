import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { Formik } from 'formik'
import gql from 'graphql-tag'
import ReactModal from 'react-modal'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { bool, func, string } from 'prop-types'
import ErrorMessage from './ErrorMessage'
import Button from './Button'
import { validate } from './StoryCreator'

const styles = {
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

const EDIT_STORY_MUTATION = gql`
  mutation EDIT_STORY_MUTATION($id: ID!, $body: String!, $title: String!) {
    updateStory(id: $id, body: $body, title: $title) {
      id
      title
      body
    }
  }
`

const EditForm = styled.form`
  border-radius: 4px;
  min-width: 600px;
  background-color: ${props => props.theme.white};
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  input,
  textarea {
    font-family: 'Alegreya', serif;
    border: 3px solid ${props => props.theme.yellow};
    outline: none;
    color: ${props => props.theme.black};
  }

  .title-block {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    input {
      width: 100%;
      padding: 10px 20px;
      font-size: 2.4rem;
      margin-bottom: 4px;
    }
  }

  .body-block {
    margin-bottom: 10px;
    textarea {
      font-size: 1.6rem;
      line-height: 1.4;
      width: 100%;
      padding: 10px 20px;
      resize: none;
      min-height: 300px;
      max-height: 500px;
      overflow: scroll;
    }
  }

  .error-message {
    color: ${props => props.theme.red};
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
        background-color: #32cd32;
        &:hover {
          background-color: #228b22;
        }
      }
    }
  }
`

function EditingStoryModal({ isOpen, toggle, title, body, id }) {
  return (
    <ReactModal
      onRequestClose={event => {
        event.stopPropagation()
        toggle(false)
      }}
      isOpen={isOpen}
      style={styles}
      ariaHideApp
    >
      <Mutation mutation={EDIT_STORY_MUTATION}>
        {(editStory, { loading, error }) => (
          <Formik
            isInitialValid={false}
            initialValues={{
              title,
              body,
            }}
            onSubmit={async values => {
              await editStory({ variables: { ...values, id } })
              toggle(false)
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
                <ErrorMessage error={error} />
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
                  <ReactTextareaAutosize
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
                  <Button
                    type="button"
                    onClick={() => {
                      toggle(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button loading={loading} type="submit">
                    Save
                  </Button>
                </div>
              </EditForm>
            )}
          </Formik>
        )}
      </Mutation>
    </ReactModal>
  )
}

EditingStoryModal.propTypes = {
  isOpen: bool.isRequired,
  toggle: func.isRequired,
  title: string.isRequired,
  body: string.isRequired,
  id: string.isRequired,
}

export default EditingStoryModal
