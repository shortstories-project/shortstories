// @flow
import React from 'react'
import styled from 'styled-components'

const StyledTextarea = styled.textarea`
  margin-bottom: 15px;
  width: 640px;
  box-sizing: border-box;
  height: 860px;
  padding: 25px;
  font-size: 1rem;
  font-family: 'PT Sans', sans-serif;
  resize: none;
  border: 3px solid #eee;
  &:focus {
    outline: 0;
  }
  ${(props: Object) => ({ ...props.style })}
`

type Props = {
  value: string,
  onChange: Function,
  placeholder: string,
  style?: Object,
  maxLength?: number,
}

const Textarea = ({
  value,
  onChange,
  placeholder,
  style,
  maxLength,
}: Props) => (
  <StyledTextarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={style}
    maxLength={maxLength}
  />
)

export default Textarea
