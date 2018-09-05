import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  id: string
  type: string
  label: string
  name?: string
  value?: string
  onChange?: (e: any) => void
}

interface IState {
  value: string
}

const Container: any = styled.div`
  position: relative;
  z-index: 1;
  display: inline-block;
  width: 100%;
  vertical-align: top;
  overflow: hidden;
  padding-top: 16px;
`

const TextField: any = styled.input`
  position: relative;
  display: block;
  float: right;
  padding: 0.8em;
  width: 60%;
  border: none;
  border-radius: 0;
  background: #f0f0f0;
  padding: 0.5em 0em 0.25em;
  width: 100%;
  background: transparent;
  color: black;
  font-size: 1.25em;
  &:focus {
    outline: none;
    + label {
      color: var(--black);
      transform: translate3d(0, -1.25em, 0) scale3d(0.75, 0.75, 1);
    }
    ~ svg {
      stroke: var(--black);
      transform: translate3d(-66.6%, 0, 0);
    }
  }
  + label {
    color: ${(props: any) => (!props.isEmpty ? 'var(--black)' : '#6a7989')};
    transform: ${(props: any) =>
      !props.isEmpty
        ? 'translate3d(0, -1.25em, 0) scale3d(0.75, 0.75, 1)'
        : 'initial'};
  }
  ~ svg {
    stroke: ${(props: any) => (!props.isEmpty ? 'var(--black)' : '#92989e')};
    transform: ${(props: any) =>
      !props.isEmpty ? 'translate3d(-66.6%, 0, 0)' : 'initial'};
  }
`

const Label = styled.label`
  display: inline-block;
  padding: 0 1em;
  width: 40%;
  font-size: 70.25%;
  user-select: none;
  position: absolute;
  top: 0.95em;
  font-size: 0.85em;
  font-weight: normal;
  letter-spacing: 0;
  left: 0;
  display: block;
  width: 100%;
  text-align: left;
  padding: 0em;
  pointer-events: none;
  transform-origin: 0 0;
  transition: transform 0.3s 0.1s, color 1s;
  transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
  > span {
    position: relative;
    display: block;
    padding: 20px 0;
    width: 100%;
  }
`

const Line = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  fill: none;
  pointer-events: none;
  transition: transform 0.7s, stroke 0.7s;
  transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
`

class Input extends React.PureComponent<IProps, IState> {
  public static defaultProps = {
    type: 'text',
    value: '',
  }

  public render() {
    const { id, type, label, onChange, value, ...rest } = this.props
    return (
      <Container>
        <TextField
          {...rest}
          isEmpty={value.length === 0}
          onChange={onChange}
          value={value}
          type={type}
          id={id}
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
    )
  }
}

export default Input
