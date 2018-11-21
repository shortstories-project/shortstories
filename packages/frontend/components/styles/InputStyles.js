import styled from 'styled-components'

const InputStyles = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 71px;

  .input-container {
    position: relative;
    display: inline-block;
    width: 100%;
    vertical-align: top;
    overflow: hidden;
    padding-top: 16px;
  }

  .field {
    position: relative;
    display: block;
    float: right;
    font-family: 'Montserrat', sans-serif;
    border: ${props => props.theme.black};
    border-radius: 0;
    padding: 0.5em 0em 0.5em;
    width: 100%;
    background: transparent;
    text-shadow: none;
    color: black;
    font-size: 1.25em;
    + .label {
      color: ${props => (!props.isEmpty ? props.theme.black : '#6a7989')};
      transform: ${props =>
        !props.isEmpty
          ? 'translate3d(0, -1.25em, 0) scale3d(0.75, 0.75, 1)'
          : 'initial'};
    }
    ~ .line {
      stroke: ${props => (!props.isEmpty ? props.theme.black : '#92989e')};
      transform: ${props =>
        !props.isEmpty ? 'translate3d(-66.6%, 0, 0)' : 'initial'};
    }
    &:focus {
      outline: none;
      + .label {
        color: ${props => props.theme.black};
        transform: translate3d(0, -1.25em, 0) scale3d(0.75, 0.75, 1);
      }
      ~ .line {
        stroke: ${props => props.theme.black};
        transform: translate3d(-66.6%, 0, 0);
      }
    }
  }

  label {
    text-shadow: none;
    user-select: none;
    position: absolute;
    top: 0.75em;
    font-family: 'Montserrat', sans-serif;
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
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    fill: none;
    pointer-events: none;
    transition: transform 0.7s, stroke 0.7s;
    transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
  }

  .error-message {
    font-size: 1rem;
    letter-spacing: 0px;
    font-weight: normal;
    line-height: normal;
    text-shadow: none;
    color: ${props => props.theme.red};
    font-family: 'Montserrat', sans-serif;
  }
`

export default InputStyles
