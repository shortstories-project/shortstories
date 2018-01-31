// @flow
import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`

const Loader = styled.div`
  display: block;
  position: relative;
  left: ${props => props.positionL};
  top: ${props => props.positionL};
  width: ${props => props.size};
  height: ${props => props.size};
  margin: -45px 0 0 -45px;
  z-index: 1500;
  border: 3px solid transparent;
  border-top-color: ${props => props.colorL};
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
  &::before {
    content: '';
    position: absolute;
    top: ${props => props.positionM};
    left: ${props => props.positionM};
    right: ${props => props.positionM};
    bottom: ${props => props.positionM};
    border: 3px solid transparent;
    border-top-color: ${props => props.colorM};
    border-radius: 50%;
    animation: ${spin} 3s linear infinite;
  }
  &::after {
    content: '';
    position: absolute;
    top: ${props => props.positionS};
    left: ${props => props.positionS};
    right: ${props => props.positionS};
    bottom: ${props => props.positionS};
    border: 3px solid transparent;
    border-top-color: ${props => props.colorS};
    border-radius: 50%;
    animation: ${spin} 1.5s linear infinite;
  }
`

const Preloader = () => (
  <Container>
    <Loader
      size="90px"
      positionL="50%"
      positionM="5px"
      positionS="15px"
      colorL="#3f4448"
      colorM="#1e2c42"
      colorS="#000"
    />
  </Container>
)

export default Preloader
