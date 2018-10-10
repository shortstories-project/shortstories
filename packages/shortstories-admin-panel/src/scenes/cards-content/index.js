import * as React from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom'

import CardContent from '../../components/card-content'

const Container = styled.div`
  display: flex;
  height: 700px;
  > div {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: auto;
  }
`

class CardsContent extends React.PureComponent {
  render() {
    return (
      <Container>
        <div>
          <Link style={{ width: 230 }} to={'/users'}>
            <CardContent content={'Users'} />
          </Link>
          <Link style={{ width: 230 }} to={'/stories'}>
            <CardContent content={'Stories'} />
          </Link>
          <Link style={{ width: 230 }} to={'/comments'}>
            <CardContent content={'Comments'} />
          </Link>
        </div>
      </Container>
    )
  }
}

export default CardsContent
