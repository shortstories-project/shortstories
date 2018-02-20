// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

// Components
import OAuthButton from './OAuthButton'
import TwitterIcon from './TwitterIcon'

// Utils
import { conditionalRender } from '../../../Utils'

// Styled components
const Button = styled.button`
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  background: transparent;
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
  color: ${(props: Object) => props.color};
`
const TypeDescription = styled.p`
  text-align: center;
  font-size: 0.9rem;
  margin: 15px 0;
  border-top: 1px solid grey;
  padding: 15px 0;
`

// Types
type Props = {
  isOpen: boolean,
  closeModal: Function,
  typeFromProps?: string,
}
type State = {
  type: string
}

class AuthModal extends Component<any, Props, State> {
  state = {
    type: 'Sign up',
  }

  componentWillReceiveProps({ typeFromProps }: Props) {
    if (typeFromProps !== this.props.typeFromProps) {
      this.changeType(typeFromProps || 'Sign up')
    }
  }

  changeType = (type: string) => {
    this.setState({ type })
  }

  renderTypeDescription = (message: string, type: string) => (
    <TypeDescription>
      {message}
      <Button
        color="#50abf1"
        onClick={() => this.changeType(type)}
      >
        {type}
      </Button>
    </TypeDescription>
  )

  render() {
    const { isOpen, closeModal } = this.props
    const { type } = this.state
    const getTitle = (t: string, social: string): string =>
      (t === 'Sign Up' ? `Continue with ${social}` : `Log in with ${social}`)
    return (
      <Modal
        isOpen={isOpen}
        className="AuthModal"
        overlayClassName="OverlayAuthModal"
        onRequestClose={closeModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick
      >
        <OAuthButton
          Icon={TwitterIcon}
          title={getTitle(type, 'Twitter')}
          onClick={() => window.location.assign('http://localhost:2300/web_api/auth/twitter')}
          bgColor="#50abf1"
        />
        {conditionalRender(
          type === 'Sign Up',
          this.renderTypeDescription('Already have an Short stories account?', 'Log In'),
          this.renderTypeDescription('Don’t have an account?', 'Sign Up'),
        )}
      </Modal>
    )
  }
}

export default AuthModal
