import styled from 'styled-components'

export const Container: any = styled.div`
  position: relative;
  z-index: 1;
  display: inline-block;
  width: 100%;
  vertical-align: top;
  overflow: hidden;
  padding-top: 16px;
`

export const TextField: any = styled.input`
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

export const Label: any = styled.label`
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

export const Line: any = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  fill: none;
  pointer-events: none;
  transition: transform 0.7s, stroke 0.7s;
  transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
`

export const Error: any = styled.span`
  font-size: 0.85em;
  font-weight: normal;
  text-shadow: none;
  color: red;
`
