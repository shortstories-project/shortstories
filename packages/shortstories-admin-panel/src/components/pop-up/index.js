import * as React from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around !important;
    width: 350px;
    height: 120px;
    background: #ffc5f8 !important;
    position: absolute;
    border-radius: 20px;
    top: 240px;
    left: 545px;
    box-shadow: 0 0 17px rgba(122,107,107,0.5);
    > div > button {
      margin: 0 10px;
      font-weight: bold;
    }
`

class CardsContent extends React.PureComponent {
  render() {
    return (
      <Container>
        <p>Delete user?</p>
        <div>
          <button className={'button is-primary is-rounded'}>Yes</button>
          <button className={'button is-primary is-rounded'}>No</button>
        </div>
      </Container>
    )
  }
}

export default CardsContent
