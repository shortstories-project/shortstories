import styled from 'styled-components'

const StoryStyles = styled.div`
  cursor: pointer;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.25);
  padding: 20px;
  transform: translateZ(0);
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out,
    opacity 0.2s ease-out;
  transition-delay: 0.1s;

  &:hover {
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

  .author {
    display: flex;
    height: 50px;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
      margin-right: 15px;
    }

    .name-and-date {
      display: flex;
      flex-direction: column;
      justify-content: center;

      a {
        font-size: 1.6rem;
        font-weight: bold;
      }

      p {
        font-size: 1rem;
      }
    }
  }

  p {
    margin: 0;
  }
`

export default StoryStyles
