import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Formik } from 'formik'
import gql from 'graphql-tag'
import nanoid from 'nanoid'
import Button from './Button'
import Error from './ErrorMessage'
import User from './User'
import PleaseSignIn from './PleaseSignIn'
import { STORIES_QUERY } from './Stories'

const CREATE_STORY_MUTATION = gql`
  mutation CREATE_STORY_MUTATION($title: String!, $body: String!) {
    createStory(title: $title, body: $body) {
      id
      body
      title
    }
  }
`

const FormStyles = styled.form`
  max-width: 700px;
  margin: 0 auto;
  display: grid;

  .title-block,
  .body-block {
    margin-bottom: 20px;
  }

  .title-block {
    input {
      width: 100%;
      padding: 10px 20px;
      font-size: 5rem;
      font-family: 'Alegreya', serif;
      color: ${props => props.theme.black};
      outline: none;
      border: 3px solid gainsboro;
      margin-bottom: 4px;
    }
  }

  .body-block {
    textarea {
      font-size: 2.1rem;
      font-family: 'Alegreya', serif;
      line-height: 1.4;
      border: 3px solid gainsboro;
      color: ${props => props.theme.black};
      width: 100%;
      padding: 10px 20px;
      outline: none;
      resize: none;
      min-height: 300px;
    }
  }

  .error-message {
    color: ${props => props.theme.red};
    font-size: 1.2rem;
    font-weight: bold;
  }
`

export const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Enter title'
  }
  if (values.body.length < 600) {
    errors.body = 'Too short story (min length = 600 symbols)'
  }
  if (values.body.length > 4000) {
    errors.body = 'Too long story (max length = 4000 symbols)'
  }
  return errors
}

function update(cache, payload) {
  const data = cache.readQuery({ query: STORIES_QUERY })
  data.stories.edges = [...data.stories.edges, payload.data.createStory]
  cache.writeQuery({
    query: STORIES_QUERY,
    data,
  })
}

const INITIAL_VALUES = {
  title: '',
  body: '',
}

function StoryCreator() {
  return (
    <User>
      {({ data: { me } }) => (
        <Formik
          isInitialValid={false}
          initialValues={INITIAL_VALUES}
          validate={validate}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setTouched,
            setSubmitting,
          }) => (
            <Mutation
              mutation={CREATE_STORY_MUTATION}
              update={update}
              optimisticResponse={{
                __typename: 'Mutation',
                createStory: {
                  __typename: 'Story',
                  id: nanoid(10),
                  title: values.title,
                  body: values.body,
                },
              }}
            >
              {(createStory, { loading, error }) => (
                <PleaseSignIn isAuth={!!me}>
                  <FormStyles onSubmit={handleSubmit}>
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
                    <Button
                      onClick={async () => {
                        setTouched(values)
                        setSubmitting(true)
                        await createStory({ variables: { ...values } })
                        Router.push('/me')
                        setSubmitting(false)
                      }}
                      loading={loading}
                      type="submit"
                    >
                      Publish
                    </Button>
                  </FormStyles>
                </PleaseSignIn>
              )}
            </Mutation>
          )}
        </Formik>
      )}
    </User>
  )
}

export default StoryCreator
