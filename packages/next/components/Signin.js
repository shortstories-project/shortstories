import React from 'react'
import Link from 'next/link'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik } from 'formik'
import AuthForm from './styles/AuthForm'
import Input from './Input'
import Error from './ErrorMessage'
import Button from './Button'
import { CURRENT_USER_QUERY } from './User'
import { isEmpty } from '../lib/validators'

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      id
      username
      email
    }
  }
`

const Signin = () => (
  <Mutation
    mutation={SIGN_IN_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(signIn, { error, loading }) => (
      <Formik
        isInitialValid={false}
        initialValues={{ login: '', password: '' }}
        onSubmit={values => {
          signIn({ variables: { ...values } })
        }}
        render={props => (
          // eslint-disable-next-line
          <AuthForm method="POST" onSubmit={props.handleSubmit}>
            <h2 className="logo">Shortstories</h2>
            <Input
              name="login"
              label="Login"
              validate={value => isEmpty(value, 'Login is required')}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              validate={value => isEmpty(value, 'Password is required')}
            />
            <div className="button-with-error">
              <Button loading={loading} type="submit">
                Login
              </Button>
              <Error error={error} />
            </div>
            <p className="more-info">
              By continuing, you agree to Shortstories&apos;s{' '}
              <Link href="/terms-of-service">
                <a>Terms of Service</a>
              </Link>
              ,{' '}
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>{' '}
              and{' '}
              <Link href="/use-cookie">
                <a>Cookie use</a>
              </Link>
              .
            </p>
            <Link href="/request-reset">
              <a className="forgotten-link">Forgotten your password?</a>
            </Link>
            <p className="signup-link">
              No account?{' '}
              <Link href="/signup">
                <a>Create one</a>
              </Link>
              .
            </p>
          </AuthForm>
        )}
      />
    )}
  </Mutation>
)

export default Signin
