import styled from "styled-components";

export const Container = styled.div`
  width: 50%;
  margin: auto;
  position: relative;
  > div > h1 {
    font-weight: 200;
    font-size: 50px;
    color: #f1a3e7;
  }
`

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    margin: 120px 0 10px;

`

export const Window = styled.div`
  display: flex;
  flex-direction: column;
  height: 350px;
  padding: 15px;
  overflow: scroll;
  background: #00d1b240;
  border-radius: 20px;
  box-shadow: 0 0 17px rgba(122, 107, 107, 0.5);
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 12px;
    background: #00d1b2;
    color: #ffff;
    border-radius: 20px;
    margin: 2px;
    font-weight: 200;
    min-height: 45px;
  }
  > div:hover {
    background: #08c7ab;
  }
  > div:hover input {
    background: #08c7ab;
  }
  > div > img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`

export const Buttons = styled.div`
  display: flex;
  width: 8%;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  > img {
    width: 16px;
  }
`

export const EmptyBlock = styled.div`
  position: absolute;
  border-radius: 20px;
  bottom: 0;
  width: 710px;
  height: 17px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(255, 255, 255, 0)),
    to(rgba(177, 246, 236, 1))
  );
`

export const EditWindow = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 16px;
    margin: 10px;
    cursor: pointer;
  }
  > label > input {
    display: none;
  }
`

export const UserPic = styled.img`
  width: 25px !important;
  margin: -5px 0px !important;
  cursor: pointer;
`