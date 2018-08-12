import * as React from 'react'
import styled from 'styled-components'

const InputContainer = styled.div`
  padding: 20px 0 0px;
  text-align: left;
`

const LabelContainer = styled.label`
  text-transform: uppercase;
  > div {
    color: #9b9b9b;
    cursor: text;
    font-size: 1rem;
    transform: translateY(-34px);
    transition: all 0.3s;
  }
`

const StyledInput: any = styled.input`
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid var(--black);
  color: var(--black);
  font-size: 2rem;
  outline: 0;
  padding: 5px 0px;
  text-align: left;
  transition: all 0.3s;
  width: 100%;
  &:focus {
    width: 100%;
    + div {
      color: #f0f0f0;
      font-size: 1rem;
      transform: translateY(-74px);
    }
  }
  ${(props: any) =>
    !props.empty &&
    `+ div {
      font-size: 1rem;
      transform: translateY(-74px);
  }`};
`

class Input extends React.PureComponent<any> {
  protected static defaultProps = {
    type: 'text',
  }

  public state = {
    value: '',
  }

  public onChange = (e: any) => {
    const { onChange } = this.props
    this.setState(
      {
        value: e.target.value,
      },
      () => {
        if (typeof onChange === 'function') {
          onChange(this.state.value)
        }
      }
    )
  }

  public render() {
    const { label, name, id, type } = this.props
    const { value } = this.state
    return (
      <InputContainer>
        <LabelContainer>
          <StyledInput empty={value.length === 0} value={value} onChange={this.onChange} type="text" />
          <div>{label}</div>
        </LabelContainer>
      </InputContainer>
    )
  }
}

export default Input
