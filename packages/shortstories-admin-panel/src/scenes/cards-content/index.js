import * as React from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom'

import CardContent from '../../components/card-content'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 700px;
  width: 80%;
  margin: auto;
  > div {
    display: flex;
    justify-content: space-between;
  }
  > h1 {
    margin: 200px 0 10px;
    font-weight: 200;
    font-size: 50px;
    color: #f1a3e7;
  }
`

class CardsContent extends React.PureComponent {
  render() {
    return (
      <Container>
        <h1>Select entity.</h1>
        <div>
          <Link style={{ width: 330 }} to={'/users'}>
            <CardContent content={'Users'} />
          </Link>
          <Link style={{ width: 330 }} to={'/stories'}>
            <CardContent content={'Stories'} />
          </Link>
          <Link style={{ width: 330 }} to={'/comments'}>
            <CardContent content={'Comments'} />
          </Link>
        </div>
      </Container>
    )
  }
}

export default CardsContent
