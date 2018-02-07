// @flow
import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 300px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  background-color: ${props => props.bgColor};
  border: none;
  border-radius: 5px;
  > p {
    font-family: 'PT Sans', sans-serif;
    font-weight: bold;
    color: #fff;
    font-size: 1.125rem;
    text-transform: uppercase;
  }
`

type Props = {
  Icon: Class<React$Component<*, *, *>>,
  onClick: Function,
  title: string,
  bgColor: string,
}

const OAuthButton = ({
  Icon,
  onClick,
  title,
  bgColor,
}: Props) => (
  <Button bgColor={bgColor} onClick={onClick}>
    <Icon />
    <p>{title}</p>
  </Button>
)

export default OAuthButton
