import * as React from 'react'
import styled from 'styled-components'

import PopUp from '../../components/pop-up'
import Input from '../../components/input'

import deleteIcon from '../../image/delete.png'
import editIcon from '../../image/edit.png'
import checkMarkIcon from '../../image/check-mark.png'
import userIcon from '../../image/user.png'

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
    min-height: 45px;
  }
  > div > img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`

const Buttons = styled.div`
  display: flex;
  width: 8%;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  > img {
    width: 16px;
  }
`

const EmptyBlock = styled.div`
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

const EditWindow = styled.div`
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

const UserPic = styled.img`
  width: 25px !important;
  margin: -5px 0px !important;
  cursor: pointer;
`

class Users extends React.PureComponent {
  state = {
    // TODO заглушака бля бэкэнда
    dataUsers: [
      { name: 'Artem', lastName: 'Migovan', showEdit: true },
      { name: 'Oleg', lastName: 'Dodzh', showEdit: true },
      { name: 'Ivan', lastName: 'Trupyn', showEdit: true },
      { name: 'Petya', lastName: 'Ebanov', showEdit: true },
      { name: 'LeXa', lastName: '007', showEdit: true },
      { name: 'Kirya', lastName: 'Sexmachin', showEdit: true },
      { name: 'Vika', lastName: 'Onal4ik', showEdit: true },
      { name: 'Kirya', lastName: 'Sexmachin', showEdit: true },
      { name: 'Ivan', lastName: 'Trupyn', showEdit: true },
      { name: 'Oleg', lastName: 'Dodzh', showEdit: true },
      { name: 'Ivan', lastName: 'Trupyn', showEdit: true },
      { name: 'Ivan', lastName: 'Trupyn', showEdit: true },
      { name: 'Artem', lastName: 'Migovan', showEdit: true },
      { name: 'Oleg', lastName: 'Dodzh', showEdit: true },
    ],
    index: null,
    deleteUserName: '',
    userPic: null,
  }

  openPopUp = index => {
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
    this.setState({
      dataUser: this.state.dataUsers.splice(this.state.index, 1),
    })
  }

  editUser = index => {
    const dataUsers = this.state.dataUsers.slice()
    dataUsers[index].showEdit = false
    this.setState({
      dataUsers,
    })
  }

  closeEditUser = index => {
    const dataUsers = this.state.dataUsers.slice()
    dataUsers[index].showEdit = true
    this.setState({
      dataUsers,
    })
  }

  uploadUserPic = event => {
    this.setState({
      userPic: event.target.value,
    })
  }

  render() {
    const test = `Delete' ${this.state.deleteUserName} ?`
    return (
      <Container>
        <h1>All users.</h1>
        <UserWindow>
          {this.state.dataUsers.map((item, index) => (
            <div key={index}>
              <EditWindow>
                <label>
                  <UserPic src={userIcon} title={'Change image'} />
                  <input type={'file'} onChange={this.uploadUserPic} />
                </label>
                <Input
                  valueUser={item.name + ' ' + item.lastName}
                  showEdit={this.state.dataUsers[index].showEdit}
                />
              </EditWindow>
              <Buttons>
                {this.state.dataUsers[index].showEdit ? (
                  <img
                    src={editIcon}
                    alt={'editIcon'}
                    onClick={() => this.editUser(index)}
                  />
                ) : (
                  <img
                    src={checkMarkIcon}
                    alt={'checkMarkIcon'}
                    onClick={() => this.closeEditUser(index)}
                  />
                )}
                <img
                  src={deleteIcon}
                  alt={'deleteIcon'}
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
          deleteUserName={test}
          onApprove={this.deleteUser}
        />
        <EmptyBlock />
      </Container>
    )
  }
}

export default Users
