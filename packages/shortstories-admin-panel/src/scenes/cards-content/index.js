import * as React from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'
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
          <CardContent content={'Users'} />
          <CardContent content={'Stories'} />
          <CardContent content={'Comments'} />
        </div>
      </Container>
    )
  }
}

export default CardsContent
