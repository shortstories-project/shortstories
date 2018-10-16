import * as React from 'react'
import styled from 'styled-components'

import PopUp from '../../components/pop-up'
import Input from '../../components/input'

import deleteIcon from '../../image/delete.png'
import editIcon from '../../image/edit.png'
import checkMarkIcon from '../../image/check-mark.png'

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

const StoriesWindow = styled.div`
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
  > div:hover Input {
    background: #08c7ab;
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

class Stories extends React.PureComponent {
  state = {
    // TODO заглушака бля бэкэнда
    dataStories: [
      { nameStories: 'My life story.', story: 'Migovan', showEdit: true },
      { nameStories: 'Why work in the afternoon?', story: 'Migovan', showEdit: true },
      { nameStories: 'How to cook the most delicious onions.', story: 'Migovan', showEdit: true },
      { nameStories: 'The most secret secret...', story: 'Migovan', showEdit: true },
      { nameStories: 'How to drink 100 liters of beer?', story: 'Migovan', showEdit: true },
      { nameStories: 'Why work in the afternoon?', story: 'Migovan', showEdit: true },
      { nameStories: 'My life story.', story: 'Migovan', showEdit: true },
      { nameStories: 'The most secret secret...', story: 'Migovan', showEdit: true }
    ],
    index: null,
    deleteNameStory: ''
  }

  openPopUp = index => {
    this.popUp.open()
    this.setState({
      index,
      deleteNameStory: this.state.dataStories[index].nameStories
    })
  }

  deleteStories = () => {
    let dataStories = this.state.dataStories.slice()
    dataStories.splice(this.state.index, 1)
    this.setState({
      dataStories
    })
  }

  editStories = index => {
    const dataStories = this.state.dataStories.slice()
    dataStories[index].showEdit = false
    this.setState({
      dataStories
    })
  }

  closeEditStories = index => {
    const dataStories = this.state.dataStories.slice()
    dataStories[index].showEdit = true
    this.setState({
      dataStories
    })
  }

  render() {
    return (
      <Container>
        <h1>All stories.</h1>
        <StoriesWindow>
          {this.state.dataStories.map((item, index) => (
            <div key={index}>
              <EditWindow>
                <Input
                  valueUser={item.nameStories}
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
        </StoriesWindow>
        <PopUp
          ref={node => (this.popUp = node)}
          deleteUserName={`Delete ${this.state.deleteNameStory} ?`}
          onApprove={this.deleteStories}
        />
        <EmptyBlock />
      </Container>
    )
  }
}

export default Stories
