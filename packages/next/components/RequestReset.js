import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik } from 'formik'
import { adopt } from 'react-adopt'
import AuthForm from './styles/AuthForm'
import Input from './Input'
import Button from './Button'
import { CHECK_USER_EXIST_MUTATION } from './Signup'
import { login } from '../lib/validators'

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($login: String!) {
    requestReset(login: $login) {
      email
    }
  }
`

const Composed = adopt({
  // eslint-disable-next-line
  requestResetMutation: ({ render }) => (
    <Mutation mutation={REQUEST_RESET_MUTATION}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  // eslint-disable-next-line
  checkUserExistMutation: ({ render }) => (
    <Mutation mutation={CHECK_USER_EXIST_MUTATION}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
})

class RequestReset extends Component {
  state = {
    requestSentEmail: '',
  }

  render() {
    const { requestSentEmail } = this.state
    return (
      <Composed>
        {({ requestResetMutation, checkUserExistMutation }) => (
          <Formik
            isInitialValid={false}
            initialValues={{ login: '' }}
            onSubmit={values => {
              requestResetMutation
                .mutation({ variables: { ...values } })
                .then(res => {
                  this.setState({
                    requestSentEmail: res.data.requestReset.email,
                  })
                })
            }}
            render={props => (
              // eslint-disable-next-line
              <AuthForm method="POST" onSubmit={props.handleSubmit}>
                <h2 className="logo">Shortstories</h2>
                {requestSentEmail ? (
                  <div className="success-message">
                    <h3>Email sent!</h3>
                    <p>
                      We sent a message to <span>{requestSentEmail}</span> so
                      you can pick your new password.
                    </p>
                  </div>
                ) : (
                  <>
                    <Input
                      name="login"
                      label="Login"
                      validate={value =>
                        login(value, checkUserExistMutation.mutation)
                      }
                    />
                    <div className="button-wrapper">
                      <Button
                        loading={requestResetMutation.result.loading}
                        type="submit"
                      >
                        Request Reset
                      </Button>
                      <Button onClick={Router.back}>Back</Button>
                    </div>
                  </>
                )}
              </AuthForm>
            )}
          />
        )}
      </Composed>
    )
  }
}

export default RequestReset
