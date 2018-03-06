// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AuthModal, DropdownMenuContainer } from './header-components'
import Preloader from '../preloader'
import * as actions from '../../../actions'
import { conditionalRender } from '../../../utils'

const StyledHeader = styled.header`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 5%;
  box-shadow: 0 2px 4px rgba(57, 63, 72, 0.1);
  min-width: 640px;
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

type Props = {
  user: {
    name: string,
    avatar: string,
  },
  showModal: Function,
  hideModal: Function,
  isFetching: boolean,
  isShowModal: boolean,
}

type State = {
  type?: string,
}

class Header extends Component<*, Props, State> {
  state = {
    type: undefined,
  }

  openModal = (type) => {
    const { showModal } = this.props
    this.setState({ type }, showModal)
  }

  render() {
    const { type } = this.state
    const {
      user: { name, avatar },
      isFetching,
      hideModal,
      isShowModal,
    } = this.props
    return (
      <StyledHeader>
        <Logo to="/">Short stories</Logo>
        {conditionalRender(
          isFetching,
          <Preloader />,
          conditionalRender(
            Boolean(name && avatar),
            <DropdownMenuContainer
              name={name}
              avatar={avatar}
            />,
            <ButtonsWrapper>
              <AuthButton onClick={() => this.openModal('Sign Up')}>Sign Up</AuthButton>
              <AuthButton onClick={() => this.openModal('Log In')}>Log In</AuthButton>
            </ButtonsWrapper>,
          ),
        )}
        <AuthModal isOpen={isShowModal} closeModal={hideModal} typeFromProps={type} />
      </StyledHeader>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(actions.showAuthModal()),
  hideModal: () => dispatch(actions.hideAuthModal()),
})

const mapStateToProps = ({ entities: { users }, UI: { userFetching, isShowModal } }) => ({
  user: Object.values(users)[0] || {},
  isFetching: userFetching,
  isShowModal,
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
