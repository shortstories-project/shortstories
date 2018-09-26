import * as React from 'react'
import { defaultProps } from 'recompose'
import { Container, TextField, Label, Line, Error, Wrapper } from './styled'

interface IProps {
  id: string
  type: string
  label: string
  name?: string
  value?: string
  onChange: (event: any) => void
  onBlur?: (event: any) => void
  error?: string
}

const Input = defaultProps({
  id: '',
  type: 'text',
  value: '',
  label: '',
  name: '',
  onChange: e => console.log(e.target.value),
  onBlur: e => console.log(e.target.value),
  error: '',
})(({ id, name, value, onChange, onBlur, type, label, error }: IProps) => (
  <Wrapper>
    <Container>
      <TextField
        id={id}
        name={name}
        isEmpty={value.length === 0}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        type={type}
      />
      <Label htmlFor={id}>
        <span>{label}</span>
      </Label>
      <Line
        width="300%"
        height="100%"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" />
      </Line>
    </Container>
    <Error>{error}</Error>
  </Wrapper>
))

export default Input
