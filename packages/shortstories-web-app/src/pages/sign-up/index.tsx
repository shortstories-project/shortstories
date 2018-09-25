import * as React from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import {
  GridContainer,
  GridRow,
  GridColumn,
  Logo,
  Input,
  Button,
} from 'components'
import * as routes from '../../constants/routes'
import history from '../../constants/history'
import { SIGN_UP } from '../../constants/mutations'

interface IProps {
  refetch?: () => void
}

interface IState {
  username: string
  email: string
  password: string
  passwordConfirmation: string
  [field: string]: any
}

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

const INITIAL_STATE: IState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

class SignUp extends React.Component<IProps, IState> {
  state = { ...INITIAL_STATE }

  onChange = ({ target }: any) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  onSubmit = (event, signUp) => {
    signUp().then(async () => {
      this.setState({ ...INITIAL_STATE })
      await this.props.refetch()
      history.push(routes.STORIES)
    })
    event.preventDefault()
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state
    return (
      <Mutation mutation={SIGN_UP} variables={{ username, email, password }}>
        {(signUp, { data, loading, error }) => (
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

export default SignUp
