import React from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import AuthForm from './styles/AuthForm'
import Input from './Input'
import Error from './ErrorMessage'
import Button from './Button'
import { CURRENT_USER_QUERY } from './User'
import { password, confirmationPassword } from '../lib/validators'

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $token: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    resetPassword(
      token: $token
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      id
    }
  }
`

const Reset = ({ token }) => (
  <Mutation
    mutation={RESET_PASSWORD_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(reset, { error, loading }) => (
      <Formik
        isInitialValid={false}
        initialValues={{ password: '', passwordConfirmation: '' }}
        onSubmit={async values => {
          await reset({ variables: { ...values, token } })
          Router.push('/')
        }}
        render={props => (
          // eslint-disable-next-line
          <AuthForm method="POST" onSubmit={props.handleSubmit}>
            <h2 className="logo">Shortstories</h2>
            <Error error={error} />
            <Input
              name="password"
              type="password"
              label="Password"
              validate={password}
            />
            <Input
              name="passwordConfirmation"
              type="password"
              label="Password Confirm"
              validate={value =>
                // eslint-disable-next-line
                confirmationPassword(value, props.values.password)
              }
            />
            <div className="button-with-error">
              <Button loading={loading} type="submit">
                Reset password
              </Button>
            </div>
          </AuthForm>
        )}
      />
    )}
  </Mutation>
)

Reset.propTypes = {
  token: PropTypes.string.isRequired,
}

export default Reset
