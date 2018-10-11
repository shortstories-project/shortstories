import * as React from 'react'
import styled from 'styled-components'

import PopUp from '../../components/pop-up'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 350px;
  margin: auto;
  margin-top: 150px;
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
    min-height: 30px;
  }
  > div > img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`

const EmptyBlock = styled.div`
  position: absolute;
  border-radius: 20px;
  bottom: 0;
  left: 366px;
  width: 710px;
  height: 28px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), to(rgba(177, 246, 236, 1)));
`

const Div = styled.div`
  position: relative;
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
    showPopUp: false,
    index: null,
    deleteUser: ''
  }

  openPopUp = (index) => {
    this.setState({
      showPopUp: true,
      deleteUser: this.state.dataUsers[index].name + ' ' + this.state.dataUsers[index].lastName
    })
  }

  notDeleteItem = () => {
    this.setState({
      showPopUp: false
    })
  }

  deleteItem = () => {
    this.setState({
      dataUser: this.state.dataUsers.splice(this.state.index, 1),
      showPopUp: false
    })
  }

  render() {
    return (
      <Div>
        <Container>
          {this.state.dataUsers.map((item, index) => (
            <div key={index}>
              <p>{item.name + ' ' + item.lastName}</p>
              <span
                className={'delete'}
                onClick={() => {
                  this.setState({
                    index
                  })
                  this.openPopUp(index)
                }}
              />
            </div>
          ))}
          {this.state.showPopUp ?
            <PopUp deleteItem={this.deleteItem}
                   notDeleteItem={this.notDeleteItem}
                   deleteUser={this.state.deleteUser}/> : ''}
        </Container>
        <EmptyBlock/>
      </Div>
    )
  }
}

export default Users
