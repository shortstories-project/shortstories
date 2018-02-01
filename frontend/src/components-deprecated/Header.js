// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

import twitterLogo from '../icons/twitter.svg'

const StyledHeader = styled.header`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 5%;
  box-shadow: 0 2px 4px rgba(57, 63, 72, 0.1);
`

const Logo = styled(Link)`
  text-decoration: none;
  color: #000;
  width: 230px;
  cursor: pointer;
  font-family: 'Caveat', sans-serif;
  font-size: 3rem;
  text-align: center;
  text-shadow 1px 3px 0 rgba(18, 86, 136, 0.11);
`

const ButtonsWrapper = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
`

const AuthButton = styled.button`
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  background: transparent;
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
  color: ${props => (props.blue ? '#50abf1' : '#000')};
`

const TwitterButton = styled.button`
  cursor: pointer;
  width: 307px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  background-color: #50abf1;
  border: none;
  border-radius: 5px;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > div > img {
    width: 50px;
    height: 50px;
  }
  > div > p {
    font-family: 'PT Sans', sans-serif;
    font-weight: bold;
    color: #fff;
  }
`

const Message = styled.p`
  text-align: center;
  font-size: 0.9rem;
  margin: 15px 0;
  border-top: 1px solid grey;
  padding: 15px 0;
`

type Props = {}

type State = {
  isOpenModal: boolean,
  authType?: string
}

export default class Header extends Component<Props, State> {
  state = {
    isOpenModal: false,
    authType: undefined,
  }

  render() {
    const { isOpenModal, authType } = this.state
    const authTitle = authType === 'Sign Up' ? 'Continue with Twitter' : 'Log in with Twitter'
    return (
      <StyledHeader>
        <Logo to="/">Short stories</Logo>
        <ButtonsWrapper>
          <AuthButton
            onClick={() =>
              this.setState({
                isOpenModal: true,
                authType: 'Sign Up',
              })
            }
          >
            Sign Up
          </AuthButton>
          <AuthButton
            onClick={() =>
              this.setState({
                isOpenModal: true,
                authType: 'Log In',
              })
            }
          >
            Log In
          </AuthButton>
        </ButtonsWrapper>
        <Modal
          isOpen={isOpenModal}
          className="AuthModal"
          overlayClassName="OverlayAuthModal"
          onRequestClose={() => this.setState({ isOpenModal: false })}
          shouldCloseOnOverlayClick
        >
          <TwitterButton>
            <div>
              <img src={twitterLogo} alt={authTitle} />
              <p>{authTitle}</p>
            </div>
          </TwitterButton>
          {authType === 'Sign Up' ? (
            <Message>
              Already have an Short stories account?
              <AuthButton
                blue
                onClick={() =>
                  this.setState({
                    isOpenModal: true,
                    authType: 'Log In',
                  })
                }
              >
                Log in
              </AuthButton>
            </Message>
          ) : (
            <Message>
              Don’t have an account?
              <AuthButton
                blue
                onClick={() =>
                  this.setState({
                    isOpenModal: true,
                    authType: 'Sign Up',
                  })
                }
              >
                Sign Up
              </AuthButton>
            </Message>
          )}
        </Modal>
      </StyledHeader>
    )
  }
}
