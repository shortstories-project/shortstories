import * as React from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom'
// import { GET_ME } from '../../constants/queries'
// import { Query } from 'react-apollo'
// import Session from '../../components/testy'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  height: 500px;
  margin: auto;
  align-items: center;
  > input {
    margin: 7px;
  }
  > button {
    margin: 7px;
  }
`

class SignIn extends React.PureComponent {
  state = {
    okay: null,
  }

  dataLogin = event => {
    // console.log(event.target.value)
  }
  dataPassword = event => {
    // console.log(event.target.value)
  }

  render() {
    return (
      <div>
        {this.withSession}
        <Form>
          <input
            className={'input is-rounded'}
            placeholder={'Login'}
            onChange={this.dataLogin}
          />
          <input
            className={'input is-rounded'}
            placeholder={'Password'}
            onChange={this.dataPassword}
          />
          <Link to={'/cards-content'}>
            <button className={'button is-primary is-rounded'}>Login</button>
          </Link>
        </Form>
      </div>
    )
  }
}

export default SignIn
