import React, { Component } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import { Query } from 'react-apollo'
import User from './User'
import PleaseSignIn from './PleaseSignIn'
import DropAndCrop from './DropAndCrop'
import BigLoader from './BigLoader'
import StoriesGrid from './StoriesGrid'
import Error from './ErrorMessage'
import getPhoto from '../lib/get-photo'
import { STORIES_QUERY } from './Stories'

const AccountStyles = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  .photo-edit {
    cursor: pointer;
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    outline: none;
    width: 100px;
    height: 100px;
    .photo-icon {
      position: absolute;
      width: 40px;
      height: 40px;
      top: 30px;
      left: 30px;
      right: 0;
      bottom: 0;
    }
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: ${props => props.theme.bs};
    }
    .blur {
      width: 100%;
      height: 100%;
      background-color: #333;
      opacity: 0.4;
      border-radius: 50%;
      position: absolute;
      top: 0;
      transition: opacity 0.25s ease-in-out;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    .username {
      font-size: 3.6rem;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .email {
      font-size: 1.4rem;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }

  nav {
    border-bottom: 1px solid rgb(109, 71, 217, 0.2);
    margin-bottom: 50px;
    ul {
      margin: 0;
      padding: 0;
      margin-bottom: -1px;
      white-space: nowrap;
      list-style-type: none;
      li {
        display: inline-block;
        padding-bottom: 8px;
        margin-right: 20px;
        button {
          outline: none;
          cursor: pointer;
          border: none;
          margin: 0;
          padding: 0;
          color: #6d47d9;
          font-size: 1.6rem;
          font-weight: bold;
          background: transparent;
          opacity: 0.8;
        }
      }
      .active {
        border-bottom: 1px solid rgb(109, 71, 217, 0.54);
        button {
          opacity: 1;
        }
      }
    }
  }
`

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    border: 'none',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 999,
  },
  body: {
    overflowY: 'hidden',
  },
}

Modal.setAppElement('#__next')

class Account extends Component {
  state = {
    activeTab: 'written',
    isOpen: false,
  }

  changeTab = (tab, cb) => {
    this.setState(
      {
        activeTab: tab,
      },
      () => {
        cb()
      }
    )
  }

  openModal = () => {
    this.setState({
      isOpen: true,
    })
  }

  closeModal = () => {
    this.setState({
      isOpen: false,
    })
  }

  render() {
    const { activeTab, isOpen } = this.state
    return (
      <User>
        {({ data: { me } }) => (
          <Query
            query={STORIES_QUERY}
            variables={
              activeTab === 'written'
                ? { limit: 20, userId: me.id, isLiked: false }
                : { limit: 20, userId: null, isLiked: true }
            }
          >
            {({ data: { stories }, loading, error, fetchMore, refetch }) => {
              if (loading) return <BigLoader />
              if (error) return <Error error={error} />
              return (
                <PleaseSignIn isAuth={me}>
                  <AccountStyles>
                    <div className="user-info">
                      <button
                        onClick={this.openModal}
                        className="photo-edit"
                        type="button"
                      >
                        <img
                          className="avatar"
                          src={getPhoto(me.photo)}
                          alt={me.username}
                        />
                        <div className="blur">
                          <img
                            className="photo-icon"
                            src="/static/icons/photo.svg"
                            alt=""
                          />
                        </div>
                      </button>
                      <span className="username">{me.username}</span>
                      <span className="email">{me.email}</span>
                    </div>
                    <nav>
                      <ul>
                        <li className={activeTab === 'written' ? 'active' : ''}>
                          <span>
                            <button
                              type="button"
                              role="tab"
                              onClick={() => this.changeTab('written', refetch)}
                            >
                              Written
                            </button>
                          </span>
                        </li>
                        <li className={activeTab === 'favs' ? 'active' : ''}>
                          <span>
                            <button
                              type="button"
                              role="tab"
                              onClick={() => this.changeTab('favs', refetch)}
                            >
                              Favs
                            </button>
                          </span>
                        </li>
                      </ul>
                    </nav>
                    {!stories.edges.length ? (
                      <p>No stories</p>
                    ) : (
                      <StoriesGrid {...stories} fetchMore={fetchMore} />
                    )}
                  </AccountStyles>
                  <Modal
                    onRequestClose={this.closeModal}
                    isOpen={isOpen}
                    style={customStyles}
                  >
                    <DropAndCrop afterSave={this.closeModal} />
                  </Modal>
                </PleaseSignIn>
              )
            }}
          </Query>
        )}
      </User>
    )
  }
}

export default Account
