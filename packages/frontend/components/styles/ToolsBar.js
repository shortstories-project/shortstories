import styled from 'styled-components'

const ToolsBar = styled.div`
  background: linear-gradient(
    hsla(0, 0%, 100%, 0),
    hsla(0, 0%, 100%, 0.95),
    #fff
  );
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  padding-top: 64px;
  padding-left: 20px;
  padding-right: 20px;
  position: absolute;
  width: 100%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  .buttons-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 16px;
      img {
        width: 16px;
        height: 16px;
        margin-bottom: 2px;
      }
      span {
        font-size: 1rem;
      }
    }
  }
`

export default ToolsBar
