import styled from 'styled-components'

const StoryStyles = styled.div`
  cursor: pointer;
  opacity: 0.95;
  height: 450px;
  overflow: hidden;
  background: ${props => props.theme.white};
  border: 5px solid ${props => props.theme.yellow};
  padding: 20px;
  transform: translateZ(0);
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out,
    opacity 0.2s ease-out;
  transition-delay: 0.1s;

  &:hover {
    opacity: 1;
    box-shadow: rgba(45, 45, 45, 0.05) 0px 2px 2px,
      rgba(49, 49, 49, 0.05) 0px 4px 4px, rgba(42, 42, 42, 0.05) 0px 8px 8px,
      rgba(32, 32, 32, 0.05) 0px 16px 16px, rgba(49, 49, 49, 0.05) 0px 32px 32px,
      rgba(35, 35, 35, 0.05) 0px 64px 64px;
    transform: translate(0, -4px);
  }

  .title {
    margin: 1rem 0;
    font-size: 2.4rem;
    font-weight: bold;
    font-family: 'Alegreya', serif;
  }

  .body {
    font-size: 1.6rem;
    font-family: 'Alegreya', serif;
  }

  .edit-and-delete {
    display: flex;
    justify-content: flex-end;
    position: relative;
    margin-top: -20px;
    margin-right: -20px;
    margin-left: -20px;
    button {
      cursor: pointer;
      background-color: ${props => props.theme.white};
      outline: none;
      border: none;
      width: 50px;
      height: 50px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.25s ease-in-out;
      img {
        width: 20px;
        height: 20px;
      }
      &:hover {
        background-color: ${props => props.theme.lightGrey};
      }
    }
  }
`

export default StoryStyles
