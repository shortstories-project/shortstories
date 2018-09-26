import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  children?: React.ReactNode
}

const StyledContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
`

const Container = (props: IProps) => (
  <StyledContainer>{props.children}</StyledContainer>
)

export default Container
