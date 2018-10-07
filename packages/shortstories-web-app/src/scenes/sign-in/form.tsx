import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { Button, Field, ErrorMessage, Logo } from 'components'
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
  height: 290px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ToSignUp = styled.p`
  text-align: center;
  margin: 0;
  font-family: var(--main-font);
  font-size: var(--description-font-size);
  color: var(--black);
  > a {
    font-size: var(--description-font-size);
    color: var(--purple);
    font-weight: bold;
  }
`

const Description = styled.p`
  text-align: center;
  margin: 0;
  font-family: var(--main-font);
  font-size: var(--description-font-size);
  color: var(--black);
  > a {
    font-size: var(--description-font-size);
    color: var(--purple);
    font-weight: bold;
  }
`

const ButtonWithError = styled.div`
  margin: 12px 0;
  display: flex;
  flex-direction: column;
  > span {
    margin-top: 4px;
  }
`

const ForgotPassword = styled(Link)`
  margin: 12px 0;
  text-align: center;
  font-family: var(--main-font);
  font-size: var(--description-font-size);
  color: var(--purple);
  font-weight: bold;
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
            <Logo black />
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
              <Description>
                By continuing, you agree to Shortstories's{' '}
                <Link to={routes.TERMS_OF_SERVICE}>Terms of Service</Link>,{' '}
                <Link to={routes.PRIVACY_POLICY}>Privacy Policy</Link> and{' '}
                <Link to={routes.USE_COOKIE}>Cookie use</Link>.
              </Description>
              <ForgotPassword to={routes.FORGOT_PASSWORD}>
                Forgotten your password?
              </ForgotPassword>
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
