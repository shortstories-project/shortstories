import * as React from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'
import PropTypes from 'prop-types'
// import CardContent from "../card-content";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around !important;
  width: 350px;
  height: 120px;
  background: #ffff !important;
  position: absolute;
  border-radius: 20px;
  top: 120px;
  left: 545px;
  box-shadow: 0 0 17px rgba(122, 107, 107, 0.5);
  > div > button {
    margin: 0 5px;
    font-weight: 200;
  }
  > p {
    color: #f1a3e7;
    font-size: 20px;
  }
`

class PopUp extends React.PureComponent {
  render() {
    return (
      <Container>
        <p>{'Delete' + ' ' + this.props.deleteUser + '?'}</p>
        <div>
          <button
            className={'button is-primary is-rounded'}
            onClick={this.props.deleteItem}
          >
            Yes
          </button>
          <button
            className={'button is-primary is-rounded'}
            onClick={this.props.notDeleteItem}
          >
            No
          </button>
        </div>
      </Container>
    )
  }
}

PopUp.propTypes = {
  deleteUser: PropTypes.string,
  deleteItem: PropTypes.any,
  notDeleteItem: PropTypes.any,
}

export default PopUp
