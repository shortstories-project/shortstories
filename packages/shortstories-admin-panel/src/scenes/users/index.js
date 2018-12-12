import * as React from 'react'
import {Container, Header, Window, Buttons, EmptyBlock, EditWindow, UserPic} from './styled'

import PopUp from '../../components/pop-up'
import Input from '../../components/input'
import SearchBar from '../../components/search-bar'

import deleteIcon from '../../image/delete.png'
import editIcon from '../../image/edit.png'
import checkMarkIcon from '../../image/check-mark.png'
import userIcon from '../../image/user.png'



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
      { name: 'Ivangay', lastName: 'Pydor', showEdit: true },
      { name: 'Vika', lastName: 'Onal4ik', showEdit: true },
      { name: 'Kirya', lastName: 'Sexmachin', showEdit: true },
      { name: 'Ivan', lastName: 'Trupyn', showEdit: true },
      { name: 'Oleg', lastName: 'Dodzh', showEdit: true },
      { name: 'Ivan', lastName: 'Trupyn', showEdit: true },
      { name: 'Ivan', lastName: 'Trupyn', showEdit: true },
      { name: 'Artem', lastName: 'Migovan', showEdit: true },
      { name: 'Oleg', lastName: 'Dodzh', showEdit: true },
      { name: 'Ilya', lastName: 'Loh', showEdit: true },
    ],
    index: null,
    deleteUserName: '',
    userPic: null,
  }

  openPopUp = index => {
    this.popUp.open()
    this.setState({
      index,
      deleteUserName: `${this.state.dataUsers[index].name} ${
        this.state.dataUsers[index].lastName
      }`,
    })
  }

  deleteUser = () => {
    const dataUsers = this.state.dataUsers.slice()
    dataUsers.splice(this.state.index, 1)
    this.setState({
      dataUsers,
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
    return (
      <Container>
        <Header>
          <h1>All users.</h1>
          <SearchBar data={this.state.dataUsers}/>
        </Header>
        <Window>
          {this.state.dataUsers.map((item, index) => (
            <div key={index}>
              <EditWindow>
                <label>
                  <UserPic src={userIcon} title={'Change image'} />
                  <input type={'file'} onChange={this.uploadUserPic} />
                </label>
                <Input
                  value={item.name + ' ' + item.lastName}
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
        </Window>
        <PopUp
          ref={node => (this.popUp = node)}
          deleteValue={`Delete ${this.state.deleteUserName} ?`}
          onApprove={this.deleteUser}
        />
        <EmptyBlock />
      </Container>
    )
  }
}

export default Users
