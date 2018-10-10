import * as React from 'react'
import styled from 'styled-components'
import deleteImage from '../../image/delete.png'

import PopUp from '../../components/pop-up'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 300px;
  margin: auto;
  padding: 15px;
  margin-top: 150px;
  overflow: scroll;
  background: #048a7645;
  border-radius: 20px;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 12px;
    background: #048a769e;
    color: #ffff;
    border-radius: 20px;
    margin: 2px;
    font-weight: bold;
    position: relative;
  }
  > div > img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`
class Users extends React.PureComponent {
  state = {
    // TODO заглушака бля бэкэнда
    dataUsers: [
      { name: 'Artem', lastName: 'Migovan', showPopUp: false },
      { name: 'Oleg', lastName: 'Dodzh', showPopUp: false },
      { name: 'Ivan', lastName: 'Trupyn', showPopUp: false },
    ],
  }

  openPopUp = index => {
    this.setState(state => {
      const newDataUser = state.dataUsers.slice()
      newDataUser[index].showPopUp = true
      return {
        dataUsers: newDataUser,
      }
    })
  }

  deleteItem = index => {
    this.setState({
      dataUser: this.state.dataUsers.splice(index, 1),
    })
  }

  render() {
    return (
      <Container>
        {this.state.dataUsers.map((item, index) => (
          <div key={index}>
            <p>{item.name + ' ' + item.lastName}</p>
            <img
              src={deleteImage}
              alt={'delete'}
              onClick={() => {
                this.openPopUp(index)
              }}
            />
            {item.showPopUp ? <PopUp /> : ''}
          </div>
        ))}
      </Container>
    )
  }
}

export default Users
