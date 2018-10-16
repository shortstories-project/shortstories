import * as React from 'react'
import {Container, Header, Window, Buttons, EmptyBlock, EditWindow} from '../users/styled'

import PopUp from '../../components/pop-up'
import Input from '../../components/input'
import SearchBar from '../../components/search-bar'

import deleteIcon from '../../image/delete.png'
import editIcon from '../../image/edit.png'
import checkMarkIcon from '../../image/check-mark.png'

class Stories extends React.PureComponent {
  state = {
    // TODO заглушака бля бэкэнда
    dataStories: [
      { nameStories: 'My life story.', story: 'Migovan', showEdit: true },
      {
        nameStories: 'Why work in the afternoon?',
        story: 'Migovan',
        showEdit: true,
      },
      {
        nameStories: 'How to cook the most delicious onions.',
        story: 'Migovan',
        showEdit: true,
      },
      {
        nameStories: 'The most secret secret...',
        story: 'Migovan',
        showEdit: true,
      },
      {
        nameStories: 'How to drink 100 liters of beer?',
        story: 'Migovan',
        showEdit: true,
      },
      {
        nameStories: 'Why work in the afternoon?',
        story: 'Migovan',
        showEdit: true,
      },
      { nameStories: 'My life story.', story: 'Migovan', showEdit: true },
      {
        nameStories: 'The most secret secret...',
        story: 'Migovan',
        showEdit: true,
      },
    ],
    index: null,
    deleteNameStory: '',
  }

  openPopUp = index => {
    this.popUp.open()
    this.setState({
      index,
      deleteNameStory: this.state.dataStories[index].nameStories,
    })
  }

  deleteStories = () => {
    const dataStories = this.state.dataStories.slice()
    dataStories.splice(this.state.index, 1)
    this.setState({
      dataStories,
    })
  }

  editStories = index => {
    const dataStories = this.state.dataStories.slice()
    dataStories[index].showEdit = false
    this.setState({
      dataStories,
    })
  }

  closeEditStories = index => {
    const dataStories = this.state.dataStories.slice()
    dataStories[index].showEdit = true
    this.setState({
      dataStories,
    })
  }

  render() {
    return (
      <Container>
        <Header>
          <h1>All stories.</h1>
          <SearchBar data={this.state.dataUsers}/>
        </Header>
        <Window>
          {this.state.dataStories.map((item, index) => (
            <div key={index}>
              <EditWindow>
                <Input
                  value={item.nameStories}
                  showEdit={this.state.dataStories[index].showEdit}
                />
              </EditWindow>
              <Buttons>
                {this.state.dataStories[index].showEdit ? (
                  <img
                    src={editIcon}
                    alt={'editIcon'}
                    onClick={() => this.editStories(index)}
                  />
                ) : (
                  <img
                    src={checkMarkIcon}
                    alt={'checkMarkIcon'}
                    onClick={() => this.closeEditStories(index)}
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
          deleteValue={`Delete ${this.state.deleteNameStory} ?`}
          onApprove={this.deleteStories}
        />
        <EmptyBlock />
      </Container>
    )
  }
}

export default Stories
