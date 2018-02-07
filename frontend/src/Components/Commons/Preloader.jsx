import React from 'react'
import styled, { keyframes } from 'styled-components'

const pulseAndRotate = keyframes`
  0% {
    transform: rotate(-360deg) scale(1);
  }
  50% {
    transform: rotate(-180deg) scale(2);
  }
  100% {
    transform: rotate(0) scale(1);
  }
`

const Wrapper = styled.div`
  font-size: 1rem;
  animation: ${pulseAndRotate} 1.5s linear infinite;
`

const Preloader = () => (
  <Wrapper>
    <span aria-label="emoji" role="img">
      😴
    </span>
  </Wrapper>
)

export default Preloader
