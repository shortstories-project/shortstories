import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  image: string;
  informationPage: number
}

const BlockCounter = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      justify-content: center;
      > span {
          color: #545454;
          font-size: 12px;
          margin: 5px;
      }
`

class Counter extends React.PureComponent<IProps> {
  render() {
    return (
      <>
        <BlockCounter>
          <img src={this.props.image}/>
          <span>{this.props.informationPage}</span>
        </BlockCounter>
      </>
    )
  }
}

export default Counter