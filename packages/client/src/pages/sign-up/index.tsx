import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ErrorMessage } from 'components'
import * as routes from '../../constants/routes'

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

const SignUpPage = ({ history, refetch }: any) => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history} refetch={refetch} />
  </div>
)

class SignUpForm extends React.PureComponent<any, any> {
  public state = { ...INITIAL_STATE }

  public onChange = (event: any) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  public onSubmit = (event: any, signUp: any) => {
    signUp().then(async ({ data }: any) => {
      this.setState({ ...INITIAL_STATE })
      localStorage.setItem('token', data.signUp.token)
      await this.props.refetch()
      this.props.history.push(routes.MAIN)
    })
    event.preventDefault()
  }

  public render() {
    const { username, email, password, passwordConfirmation } = this.state
    const isInvalid =
      password !== passwordConfirmation ||
      password === '' ||
      email === '' ||
      username === ''
    return (
      <Mutation mutation={SIGN_UP} variables={{ username, email, password }}>
        {(signUp, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, signUp)}>
            <input
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Full Name"
            />
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="email"
              placeholder="Email Address"
            />
            <input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <input
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
            <button disabled={isInvalid || loading} type="submit">
              Sign Up
            </button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    )
  }
}

export default withRouter(SignUpPage)
