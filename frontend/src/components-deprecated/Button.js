// @flow
import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  background: transparent;
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
`

type Props = {
  title: string,
  onClick: () => {},
}

export default ({ title, onClick }: Props) => (
  <Button onClick={onClick}>
    {title}
  </Button>
)
