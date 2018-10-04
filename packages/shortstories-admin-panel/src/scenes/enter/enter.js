import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const EnterBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  height: 500px;
  margin: auto;
  align-items: center;
  > a > button {
    width: 150px;
    height: 50px;
    margin: 5px;
  }
`

class Enter extends React.PureComponent {
  render() {
    return (
      <div>
        <EnterBlock>
          <Link to={'/sign-in'}>
            <button className={'button is-primary is-rounded'}>Sign-In</button>
          </Link>
          <Link to={'/sign-up'}>
            <button className={'button is-primary is-rounded'}>Sign-Up</button>
          </Link>
        </EnterBlock>
      </div>
    )
  }
}

export default Enter
