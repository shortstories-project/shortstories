import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoaderStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;

  div {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 90px;
    height: 90px;
    margin: -45px 0 0 -45px;
    z-index: 1500;
    border: 3px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;
    &::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border: 3px solid transparent;
      border-top-color: #e5e5e5;
      border-radius: 50%;
      animation: ${spin} 3s linear infinite;
    }
    &::after {
      content: '';
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border: 3px solid transparent;
      border-top-color: #cccccc;
      border-radius: 50%;
      animation: ${spin} 1.5s linear infinite;
    }
  }
`

const BigLoader = () => (
  <LoaderStyles>
    <div />
  </LoaderStyles>
)

export default BigLoader
