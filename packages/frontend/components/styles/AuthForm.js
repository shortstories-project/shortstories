import styled from 'styled-components'

const AuthForm = styled.form`
  background-color: ${props => props.theme.white};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 40px;

  .logo {
    cursor: default;
    font-family: 'Pacifico', cursive;
    font-size: 3rem;
    line-height: 3rem;
    letter-spacing: -1.5px;
    color: ${props => props.theme.black};
    text-shadow: 3px 3px 0 rgba(200, 200, 200, 0.5);
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;
  }

  .button-with-error {
    margin: 12px 0;
    display: flex;
    flex-direction: column;
    > div {
      margin-top: 4px;
    }
  }

  .more-info,
  .forgotten-link,
  .signup-link {
    font-size: 1rem;
    line-height: normal;
    text-align: center;
    display: block;
  }

  .signup-link {
    margin-bottom: 0;
  }

  p {
    cursor: default;
  }

  .button-wrapper {
    margin-top: 12px;

    > button {
      width: calc(50% - 10px);
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .success-message {
    > p {
      margin: 0;

      span {
        color: ${props => props.theme.purple};
      }
    }
  }
`

export default AuthForm
