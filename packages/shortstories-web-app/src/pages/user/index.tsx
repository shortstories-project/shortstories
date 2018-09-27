import * as React from 'react'
import styled from 'styled-components'
import { GridContainer, GridRow, GridColumn } from '../../components/grid/index'
import CardPreview from '../../components/card-preview/index'

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
    width: 32%;
    height: 100px
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    background-color: #e9e9e9;
    > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 56%;
        min-width: 184px;
        margin: 12px 12px;
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
`

const UserPic = styled.div`
    width: 70px;
    height: 70px;
    background-color: grey;
    border-radius: 35px;
    border: 2px solid;
`

class Index extends React.PureComponent {
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
                            </UserBlock>
                            <BlockInfo>
                                <BlockInfoLike/>
                                <BlockInfoStar/>
                                <BlockInfoWatch/>
                            </BlockInfo>
                            <AddBlock/>
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

export default Index