import * as React from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'

const Container = styled.div`
  width: 350px;
  height: 120px;
  background: #ffffff;
  border: 1px solid black;
  position: absolute;
`

class CardsContent extends React.PureComponent {
  render() {
    return <Container />
  }
}

export default CardsContent
