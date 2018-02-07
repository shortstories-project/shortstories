import React, { Component } from 'react'
import styled from 'styled-components'

import { conditionalRender } from '../../Utils'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > label {
    font-size: 0.8rem;
    font-weight: bold;
  }
  > input {
    width: 250px;
    box-sizing: border-box;
    height: 45px;
    padding: 8px;
    border: 3px solid #efefef;
    margin: 4px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }
`

class Input extends Component {
  render() {
    const {
      name,
      type,
      error,
      label,
      placeholder,
      value,
      onChange,
    } = this.props
    return (
      <Wrapper>
        <label htmlFor={name}>{label}</label>
        <input
          placeholder={placeholder}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        />
        {conditionalRender(
          error,
          <label htmlFor={name}>{error}</label>,
        )}
      </Wrapper>
    )
  }
}

export default Input
