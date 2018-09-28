import * as React from 'react'
import styled from 'styled-components'
import {GridContainer, GridRow, GridColumn} from '../../components/grid/index'

import CardPreview from '../../components/card-preview'
import Counter from '../../components/counter'

import { IInformationPage } from '../../interfaces/user'

const pen = require('../../assets/images/pencil.svg');
const heart = require('../../assets/images/heart.svg');
const folder = require('../../assets/images/folder.svg');
const eye = require('../../assets/images/eye.svg');
const addButton = require('../../assets/images/add.svg');

const H1 = styled.h1`
  font-size: 28px;
  margin: 50px 0 10px;
`

const RowTableHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const RowTable = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
  flex-direction: column;
  }
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const UserName = styled.div`
  font-size: 14px;
`

const UserMail = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 3px 0;
`

const UserBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 32%;
  min-width: 220px;
  height: 100px
  border: 1px solid #e9e9e9;
  border-radius: 7px;
  background-color: #e9e9e9;
  padding: 12px;
  > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 56%;
      min-width: 184px;
      }
   > img {
      cursor: pointer;
  }
`

const BlockInfo = styled.div`
  width: 49%;
  height: 100px
  display: flex;
`

const BlockInfoLike = styled.div`
  width: 34%;
  border: 1px solid #e9e9e9;
  border-radius: 10px 0 0 10px;
  background-color: #e9e9e9;
`

const BlockInfoStar = styled.div`
  width: 34%;
  border-left: 2px solid #d34bdcbf;
  border-right: 2px solid #d34bdcbf;
  background-color: #e9e9e9;
`

const BlockInfoWatch = styled.div`
  width: 34%;
  border: 1px solid #e9e9e9;
  border-radius: 0 10px 10px 0;
  background-color: #e9e9e9;
`

const AddBlock = styled.div`
  width: 15%;
  height: 100px
  border: 1px solid #e9e9e9;
  border-radius: 7px;
  background-color: #e9e9e9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > img {
      cursor: pointer;
  }
`

const UserPic = styled.div`
  width: 70px;
  height: 70px;
  background-color: grey;
  border-radius: 35px;
  border: 2px solid;
`

//TODO заглушка для бэкэнда
const informationPage: IInformationPage = {
  like: 125,
  star: 80,
  view: 590
}

class User extends React.PureComponent {
  render() {
    return (
      <GridContainer>
        <GridRow>
          <GridColumn>
            <H1>Profile</H1>
            <RowTableHead>
              <UserBlock>
                <div>
                  <UserPic/>
                  <UserInfo>
                    <UserName>Panachyow Anton</UserName>
                    <UserMail>pana4ov@yandex.ru</UserMail>
                  </UserInfo>
                </div>
                <img src={pen}/>
              </UserBlock>
              <BlockInfo>
                <BlockInfoLike>
                  <Counter image = {heart}
                           informationPage = {informationPage.like}/>
                </BlockInfoLike>
                <BlockInfoStar>
                  <Counter image = {folder}
                           informationPage = {informationPage.star}/>
                </BlockInfoStar>
                <BlockInfoWatch>
                  <Counter image = {eye}
                           informationPage = {informationPage.view}/>
                </BlockInfoWatch>
              </BlockInfo>
              <AddBlock>
                <img src={addButton}/>
              </AddBlock>
            </RowTableHead>
            <RowTable>
              <CardPreview/>
              <CardPreview/>
              <CardPreview/>
            </RowTable>
            <RowTable>
              <CardPreview/>
              <CardPreview/>
              <CardPreview/>
            </RowTable>
          </GridColumn>
        </GridRow>
      </GridContainer>
    )
  }
}

export default User