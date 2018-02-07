// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import AuthModal from './AuthModal'
import DropdownMenu from './DropdownMenu'
import Preloader from '../Preloader'

import { conditionalRender } from '../../../Utils'

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

type Props = {
  user: {
    name: string,
    avatar: string,
  },
  isFetching?: boolean,
}

type State = {
  isOpen: boolean,
  type?: string,
}

class Header extends Component<*, Props, State> {
  state = {
    isOpen: false,
    type: undefined,
  }

  openModal = (type) => {
    this.setState({
      isOpen: true,
      type,
    })
  }

  render() {
    const { isOpen, type } = this.state
    const { user: { name, avatar }, isFetching } = this.props
    return (
      <StyledHeader>
        <Logo to="/">Short stories</Logo>
        {conditionalRender(
          isFetching,
          <Preloader />,
          conditionalRender(
            (name && avatar),
            <DropdownMenu name={name} avatar={avatar} />,
            <ButtonsWrapper>
              <AuthButton onClick={() => this.openModal('Sign Up')}>Sign Up</AuthButton>
              <AuthButton onClick={() => this.openModal('Log In')}>Log In</AuthButton>
            </ButtonsWrapper>,
          ),
        )}
        <AuthModal isOpen={isOpen} closeModal={() => this.setState({ isOpen: false })} typeFromProps={type} />
      </StyledHeader>
    )
  }
}

const mapStateToProps = ({ entities: { users }, UI }) => ({
  user: Object.values(users)[0] || {},
  isFetching: UI.userFetching,
})

export default connect(mapStateToProps)(Header)
