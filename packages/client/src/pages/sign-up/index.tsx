import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import {
  GridContainer,
  GridRow,
  GridColumn,
  Logo,
  Input,
  Button,
  ErrorMessage,
} from 'components'
import * as routes from '../../constants/routes'

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`

const AuthContainer = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 36px;
`

const Form = styled.form`
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

class SignUp extends React.PureComponent<any, any> {
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
      this.props.history.push(routes.STORIES)
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
        {signUp => (
          <GridContainer>
            <GridRow center>
              <GridColumn lg={4} md={3} sm={2} xs={1} />
              <GridColumn lg={4} md={6} sm={8} xs={10}>
                <AuthContainer>
                  <Logo full={false} />
                  <Form onSubmit={event => this.onSubmit(event, signUp)}>
                    <Input
                      type="text"
                      id="username"
                      label="Username"
                      name="username"
                      value={username}
                      onChange={this.onChange}
                    />
                    <Input
                      type="email"
                      id="email"
                      label="Email"
                      name="email"
                      value={email}
                      onChange={this.onChange}
                    />
                    <Input
                      type="password"
                      id="password"
                      label="Password"
                      name="password"
                      value={password}
                      onChange={this.onChange}
                    />
                    <Input
                      type="password"
                      id="passwordConfirmation"
                      label="Confirm password"
                      name="passwordConfirmation"
                      value={passwordConfirmation}
                      onChange={this.onChange}
                    />
                    <Button type="submit" title="REGISTER" />
                  </Form>
                </AuthContainer>
              </GridColumn>
              <GridColumn lg={4} md={3} sm={2} xs={1} />
            </GridRow>
          </GridContainer>
        )}
      </Mutation>
    )
  }
}

export default withRouter(SignUp)
