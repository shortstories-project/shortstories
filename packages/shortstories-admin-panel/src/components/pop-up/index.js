import * as React from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'
import PropTypes from 'prop-types'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around !important;
  align-items: center;
  width: 350px;
  height: 120px;
  background: #ffff !important;
  position: absolute;
  left: 200px;
  bottom: 123px;
  border-radius: 20px;
  box-shadow: 0 0 17px rgba(122, 107, 107, 0.5);
  > div > button {
    margin: 0 5px;
    font-weight: 200;
  }
  > p {
    color: #f1a3e7;
    font-size: 19px;
    font-weight: 200;
  }
`

class PopUp extends React.PureComponent {
  state = {
    isShow: false,
  }

  onApprove() {
    this.props.onApprove()
    this.close()
  }

  open = () => {
    this.setState({
      isShow: true,
    })
  }

  close = () => {
    this.setState({
      isShow: false,
    })
  }

  render() {
    return (
      <div>
        {this.state.isShow && (
          <Container>
            <p>{this.props.deleteUserName}</p>
            <div>
              <button
                className={'button is-primary is-rounded'}
                onClick={this.onApprove.bind(this)}
              >
                Yes
              </button>
              <button
                className={'button is-primary is-rounded'}
                onClick={this.close}
              >
                No
              </button>
            </div>
          </Container>
        )}
      </div>
    )
  }
}

PopUp.propTypes = {
  deleteUserName: PropTypes.string,
  onApprove: PropTypes.any,
}

export default PopUp
