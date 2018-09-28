import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { Button, Field, ErrorMessage } from 'components'
import history from '../../constants/history'
import * as routes from '../../constants/routes'
import * as validators from './validators'
import { SIGN_IN } from '../../mutations/user'

interface IProps {
  refetch: () => void
}

const Container = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 36px;
`

const SignInForm = styled.form`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ToSignUp = styled.p`
  margin: 0;
  font-family: var(--main-font);
  font-size: var(--description-font-size);
  color: var(--black);
  > a {
    color: var(--purple);
    font-weight: bold;
  }
`

const ButtonWithError = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  > span {
    margin-top: 4px;
  }
`

const INITIAL_VALUES = {
  login: '',
  password: '',
}

const Form = ({ refetch }: IProps) => (
  <Mutation mutation={SIGN_IN}>
    {(signIn, { error, loading }) => (
      <Formik
        isInitialValid={false}
        initialValues={INITIAL_VALUES}
        onSubmit={values => {
          signIn({ variables: { ...values } }).then(async () => {
            await refetch()
            history.push(routes.STORIES)
          })
        }}
      >
        {({ handleSubmit }) => (
          <Container>
            <SignInForm onSubmit={handleSubmit}>
              <Field name="login" label="Login" validate={validators.login} />
              <Field
                name="password"
                type="password"
                label="Password"
                validate={validators.password}
              />
              <ButtonWithError>
                <Button loading={loading} type="submit">
                  Login
                </Button>
                {error &&
                  error.graphQLErrors.map(err => (
                    <ErrorMessage error={err.message} />
                  ))}
              </ButtonWithError>
              <ToSignUp>
                No account? <Link to={routes.SIGN_UP}>Create one</Link>.
              </ToSignUp>
            </SignInForm>
          </Container>
        )}
      </Formik>
    )}
  </Mutation>
)

export default Form
