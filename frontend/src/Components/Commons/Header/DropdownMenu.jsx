// @flow
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { push } from 'react-router-redux'
import onClickOutside from 'react-onclickoutside'

import { conditionalRender } from '../../../Utils'

const UserBlock = styled.div`
  background-color: #fff;
  width: 150px;
  height: 80px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  :hover {
    background-color: #e0e0e0;
  }
  > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
`

const Wrapper = styled.div`
  margin-top: 5px;
  right: 5%;
  stroke: rgb(239, 239, 239);
  visibility: visible;
  background-color: #fff;
  color: #efefef;
  max-height: 90vh;
  max-width: 90vw;
  min-height: 40px;
  display: block;
  position: absolute;
  border: 1px solid currentColor;
  border-radius: 8px;
  box-sizing: border-box;
`
const InnerWrapper = styled.div`
  width: 230px;
  display: flex;
  flex-direction: column;
`
const Item = styled.div`
  cursor: pointer;
  color: black;
  padding: 12px 16px;
  border-bottom: 1px solid #efefef;
  text-transform: uppercase;
  transition: background-color 0.2s ease;
  :last-child {
    border-bottom: none;
  }
  :hover {
    background-color: #efefef;
  }
`
const Triangle = styled.div`
  top: -24px;
  right: 24px;
  position: absolute;
  color: #fff;
  fill: currentColor;
  height: 24px;
  pointer-events: none;
`

type Props = {
  avatar: string,
  name: string,
  dispatch: Function,
}

type State = {
  isOpen: boolean,
}

class DropdownMenu extends Component<any, Props, State> {
  state = {
    isOpen: false,
  }

  handleClickOutside = () => {
    this.closeDropdown()
  }

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  closeDropdown = () => {
    this.setState({
      isOpen: false,
    })
  }

  render() {
    const { avatar, name, dispatch } = this.props
    const { isOpen } = this.state
    return (
      <div>
        <UserBlock onClick={this.toggle}>
          <img src={avatar} alt="userpic" />
          <p>{name}</p>
        </UserBlock>
        {conditionalRender(
          isOpen,
          <Wrapper>
            <InnerWrapper>
              <Item
                onClick={() => {
                  dispatch(push('/profile'))
                  this.closeDropdown()
                }}
              >
                Profile
              </Item>
              <Item
                onClick={() => {
                  this.closeDropdown()
                }}
              >
                Logout
              </Item>
            </InnerWrapper>
            <Triangle>
              <svg width="24" height="24">
                <path d="M0 24 L12 12 L24 24" />
              </svg>
            </Triangle>
          </Wrapper>,
        )}
      </div>
    )
  }
}

export default compose(connect(), onClickOutside)(DropdownMenu)
