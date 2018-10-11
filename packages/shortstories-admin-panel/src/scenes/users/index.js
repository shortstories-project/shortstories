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
  background: #00d1b240;
  border-radius: 20px;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 12px;
    background: #00d1b2;
    color: #ffff;
    border-radius: 20px;
    margin: 2px;
    font-weight: bold;
    min-height: 30px;
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
      { name: 'Artem', lastName: 'Migovan' },
      { name: 'Oleg', lastName: 'Dodzh' },
      { name: 'Ivan', lastName: 'Trupyn' },
      { name: 'Petya', lastName: 'Ebanov' },
      { name: 'LeXa', lastName: '007' },
      { name: 'Kirya', lastName: 'Sexmachin' },
      { name: 'Vika', lastName: 'Onal4ik' },
      { name: 'Kirya', lastName: 'Sexmachin' },
      { name: 'Ivan', lastName: 'Trupyn' },
      { name: 'Oleg', lastName: 'Dodzh' },
      { name: 'Ivan', lastName: 'Trupyn' },
      { name: 'Ivan', lastName: 'Trupyn' },
      { name: 'Artem', lastName: 'Migovan' },
      { name: 'Oleg', lastName: 'Dodzh' }
    ],
    showPopUp: false
  }

  openPopUp = () => {
    this.setState({
      showPopUp: true
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
                this.openPopUp()
              }}
            />
          </div>
        ))}
        {this.state.showPopUp ? <PopUp /> : ''}
      </Container>
    )
  }
}

export default Users
