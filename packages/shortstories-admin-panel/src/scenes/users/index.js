import * as React from 'react'
import styled from 'styled-components'

import PopUp from '../../components/pop-up'
import Input from '../../components/input'

const Container = styled.div`
  width: 50%;
  margin: auto;
  position: relative;
  > h1 {
    margin: 120px 0 10px;
    font-weight: 200;
    font-size: 50px;
    color: #f1a3e7;
  }
`

const UserWindow = styled.div`
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
    min-height: 30px;
  }
  > div > img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`

const Buttons = styled.div`
  display: flex;
  width: 6%;
  justify-content: space-between;
  align-items: center;
`

const EmptyBlock = styled.div`
  position: absolute;
  border-radius: 20px;
  bottom: 0;
  width: 710px;
  height: 28px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(255, 255, 255, 0)),
    to(rgba(177, 246, 236, 1))
  );
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
      { name: 'Oleg', lastName: 'Dodzh' },
    ],
    index: null,
    deleteUserName: '',
    notEdit: true,
  }

  openPopUp = index => {
    // console.log(' this.popUp.open()', this.popUp.open())
    this.popUp.open()
    this.setState({
      index,
      deleteUserName:
        this.state.dataUsers[index].name +
        ' ' +
        this.state.dataUsers[index].lastName,
    })
  }

  deleteUser = () => {
    // console.log('this.state.index', this.state.index)
    this.setState({
      dataUser: this.state.dataUsers.splice(this.state.index, 1),
    })
  }

  editUser = () => {
    this.setState({
      notEdit: false,
    })
  }

  render() {
    return (
      <Container>
        <h1>All users.</h1>
        <UserWindow>
          {this.state.dataUsers.map((item, index) => (
            <div key={index}>
              {/* <input value={item.name + ' ' + item.lastName} */}
              {/* onChange={this.dataUser} */}
              {/* readOnly={this.state.notEdit} */}
              {/* type={'text'}/> */}
              <Input
                valueUser={item.name + ' ' + item.lastName}
                notEdit={this.state.notEdit}
              />
              <Buttons>
                <button onClick={this.editUser} />
                <span
                  className={'delete'}
                  onClick={() => {
                    this.openPopUp(index)
                  }}
                />
              </Buttons>
            </div>
          ))}
        </UserWindow>
        <PopUp
          ref={node => (this.popUp = node)}
          deleteUserName={this.state.deleteUserName}
          onApprove={this.deleteUser}
        />
        <EmptyBlock />
      </Container>
    )
  }
}

export default Users
