import * as React from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

interface IProps {
  Icon: () => JSX.Element
  mutationProps?: {
    mutation: any
    variables: any
    update: any
  }
  qty: number
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  > button {
    border: none;
    cursor: pointer;
    padding: 0;
    transform: scale(1);
    transition: transform 0.25s ease-in-out;
    outline: none;
    &:hover {
      transform: scale(1.2);
    }
    & svg {
      fill: black;
    }
  }
  > div {
    color: black;
    font-weight: normal;
    font-size: 8px;
    margin-top: 2px;
  }
`

class ToolsButton extends React.Component<IProps> {
  public renderButton = () => {
    const { Icon, mutationProps } = this.props
    if (typeof mutationProps === 'object') {
      const { mutation, variables, update } = mutationProps
      return (
        <Mutation mutation={mutation} variables={variables} update={update}>
          {mutate => (
            <button
              onClick={e => {
                e.stopPropagation()
                mutate()
              }}
            >
              <Icon />
            </button>
          )}
        </Mutation>
      )
    }
    return (
      <button>
        <Icon />
      </button>
    )
  }
  public render() {
    return (
      <Container>
        {this.renderButton()}
        <div>{this.props.qty}</div>
      </Container>
    )
  }
}

export default ToolsButton
