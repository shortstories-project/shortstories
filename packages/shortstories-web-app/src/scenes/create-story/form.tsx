import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { Formik } from 'formik'
import { Button, Field, ErrorMessage } from 'components'
import history from '../../constants/history'
import * as routes from '../../constants/routes'
import * as validators from './validators'
import { CREATE_STORY } from '../../mutations/story'

const Container = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 36px;
`

const CreateStoryForm = styled.form`
  height: 290px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ButtonWithError = styled.div`
  margin: 12px 0;
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

const Form = () => (
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
          <Container>
            <CreateStoryForm onSubmit={handleSubmit}>
              <Field name="title" label="Title" validate={validators.title} />
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
