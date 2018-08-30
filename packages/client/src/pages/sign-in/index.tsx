import * as React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ErrorMessage } from 'components'
import * as routes from '../../constants/routes'

const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`

const SignInPage = ({ history, refetch }: any) => (
  <div>
    <h1>Sign In</h1>
    <SignInForm history={history} refetch={refetch} />
    <p>
      Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  </div>
)

const INITIAL_STATE = {
  login: '',
  password: '',
}

class SignInForm extends React.PureComponent<any, any> {
  public state = { ...INITIAL_STATE }

  public onChange = (event: any) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  public onSubmit = (event: any, signIn: any) => {
    signIn().then(async ({ data }: any) => {
      this.setState({ ...INITIAL_STATE })
      localStorage.setItem('token', data.signIn.token)
      await this.props.refetch()
      this.props.history.push(routes.MAIN)
    })
    event.preventDefault()
  }

  public render() {
    const { login, password } = this.state
    const isInvalid = password === '' || login === ''
    return (
      <Mutation mutation={SIGN_IN} variables={{ login, password }}>
        {(signIn, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, signIn)}>
            <input
              name="login"
              value={login}
              onChange={this.onChange}
              type="text"
              placeholder="Email or Username"
            />
            <input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <button disabled={isInvalid || loading} type="submit">
              Sign In
            </button>
            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    )
  }
}

export default withRouter(SignInPage)
