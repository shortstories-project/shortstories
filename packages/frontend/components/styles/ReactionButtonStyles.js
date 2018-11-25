import styled from 'styled-components'

const ReactionButtonStyles = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  width: 60px;

  button {
    background-color: white;
    border: 1px solid #222;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    outline: none;
  }

  span {
    margin-left: 10px;
    font-weight: bold;
  }
`

export default ReactionButtonStyles
