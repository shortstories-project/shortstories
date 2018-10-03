import * as React from 'react'
import styled, { css } from 'styled-components'
import { Mutation } from 'react-apollo'
import { Formik } from 'formik'
import {
  Button,
  TextareaField,
  SimpleInputField,
  ErrorMessage,
} from 'components'
import history from '../../constants/history'
import * as routes from '../../constants/routes'
import * as validators from './validators'
import { CREATE_STORY } from '../../mutations/story'

const Container: any = styled.div`
  background-color: var(--white);
  padding: 36px;
  ${({ isVerified }: any) =>
    isVerified
      ? css`
          opacity: 0.7;
          pointer-events: none;
          filter: grayscale(1);
        `
      : null};
`

const CreateStoryForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ButtonWithError = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    margin-top: 4px;
  }
`

const INITIAL_VALUES = {
  title: '',
  body: '',
}

const Form = ({ me }: any) => (
  <Mutation mutation={CREATE_STORY}>
    {(createStory, { error, loading }) => (
      <Formik
        isInitialValid={false}
        initialValues={INITIAL_VALUES}
        onSubmit={values => {
          createStory({ variables: { ...values } }).then(async () => {
            history.push(routes.STORIES)
          })
        }}
      >
        {({ handleSubmit }) => (
          <Container isVerified={me && !me.isVerified}>
            <CreateStoryForm onSubmit={handleSubmit}>
              <SimpleInputField
                name="title"
                placeholder="Title"
                validate={validators.title}
                disabled={me && !me.isVerified}
                autoFocus
              />
              <TextareaField
                name="body"
                placeholder="Where is your mind?"
                maxLength={5000}
                minLength={2000}
                validate={validators.body}
                disabled={me && !me.isVerified}
              />
              <ButtonWithError>
                <Button loading={loading} type="submit">
                  Create story
                </Button>
                {error &&
                  error.graphQLErrors.map(err => (
                    <ErrorMessage error={err.message} />
                  ))}
              </ButtonWithError>
            </CreateStoryForm>
          </Container>
        )}
      </Formik>
    )}
  </Mutation>
)

export default Form
