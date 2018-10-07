import * as React from 'react'
import styled from 'styled-components'
import { graphql, compose } from 'react-apollo'
import { withState, withHandlers } from 'recompose'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { Button, Field, Logo } from 'components'
import history from '../../constants/history'
import * as routes from '../../constants/routes'
import * as validators from './validators'
import { SIGN_UP, CHECK_USER_EXIST } from '../../mutations/user'

interface IProps {
  refetch: () => void
  signUp: (obj: object) => any
  checkUserExist: (obj: object) => void
  loading?: boolean
  toggleLoader?: any
}

const Container = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 36px;
`

const SignUpForm = styled.form`
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ToSignIn = styled.p`
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
  margin: 12px 0;
  font-family: var(--main-font);
  font-size: var(--description-font-size);
  color: var(--black);
  > a {
    font-size: var(--description-font-size);
    color: var(--purple);
    font-weight: bold;
  }
`

const RegisterButton = styled(Button)`
  margin-top: 16px;
`

const INITIAL_VALUES = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

const Form = ({
  refetch,
  signUp,
  checkUserExist,
  loading,
  toggleLoader,
}: IProps) => (
  <Formik
    isInitialValid={false}
    initialValues={INITIAL_VALUES}
    onSubmit={values => {
      toggleLoader()
      signUp({ variables: { ...values } })
        .then(async () => {
          toggleLoader()
          await refetch()
          history.push(routes.STORIES)
        })
        .catch(() => {
          toggleLoader()
        })
    }}
  >
    {({ handleSubmit, values }) => (
      <Container>
        <Logo black />
        <SignUpForm onSubmit={handleSubmit}>
          <Field
            name="username"
            label="Username"
            validate={value => validators.username(value, checkUserExist)}
          />
          <Field
            name="email"
            type="email"
            label="Email"
            validate={value => validators.email(value, checkUserExist)}
          />
          <Field
            name="password"
            type="password"
            label="Password"
            validate={validators.password}
          />
          <Field
            name="passwordConfirmation"
            type="password"
            label="Password Confirm"
            validate={value =>
              validators.confirmationPassword(value, values.password)
            }
          />
          <RegisterButton loading={loading} type="submit">
            Register
          </RegisterButton>
          <Description>
            By continuing, you agree to Shortstories's{' '}
            <Link to={routes.TERMS_OF_SERVICE}>Terms of Service</Link>,{' '}
            <Link to={routes.PRIVACY_POLICY}>Privacy Policy</Link> and{' '}
            <Link to={routes.USE_COOKIE}>Cookie use</Link>.
          </Description>
          <ToSignIn>
            Already have an account? <Link to={routes.SIGN_IN}>Sign in</Link>.
          </ToSignIn>
        </SignUpForm>
      </Container>
    )}
  </Formik>
)

export default compose(
  graphql(SIGN_UP, { name: 'signUp' }),
  graphql(CHECK_USER_EXIST, { name: 'checkUserExist' }),
  withState('loading', 'toggleLoading', false),
  withHandlers({
    toggleLoader: (props: any) => () => {
      props.toggleLoading(!props.loading)
    },
  })
)(Form)
