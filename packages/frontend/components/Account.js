import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import ReactModal from 'react-modal'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import User from './User'
import PleaseSignIn from './PleaseSignIn'
import DropAndCrop from './DropAndCrop'
import BigLoader from './BigLoader'
import StoriesGrid from './StoriesGrid'
import Error from './ErrorMessage'
import getPhoto from '../lib/get-photo'

const WRITTEN_STORIES_QUERY = gql`
  query WRITTEN_STORIES_QUERY($cursor: String, $userId: ID) {
    stories(cursor: $cursor, limit: 20, userId: $userId, isLiked: false)
      @connection(key: "StoriesConnection") {
      edges {
        id
        title
        body
        user {
          ...author
        }
        stats {
          likes
          dislikes
          comments
        }
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  fragment author on User {
    id
    username
    photo
  }
`

const LIKED_STORIES_QUERY = gql`
  query LIKED_STORIES_QUERY($cursor: String) {
    stories(cursor: $cursor, limit: 20, userId: null, isLiked: true)
      @connection(key: "StoriesConnection") {
      edges {
        id
        title
        body
        user {
          ...author
        }
        stats {
          likes
          dislikes
          comments
        }
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  fragment author on User {
    id
    username
    photo
  }
`

const toWritten = keyframes`
  from {
    left: 85px;
  }

  to {
    left: 0px;
  }
`

const toLiked = keyframes`
  from {
    left: 0px;
  }

  to {
    left: 85px;
  }
`

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
    border-bottom: 1px solid rgb(255, 198, 0, 0.2);
    margin-bottom: 50px;
    ul {
      margin: 0;
      padding: 0;
      margin-bottom: -1px;
      white-space: nowrap;
      list-style-type: none;
      li {
        position: relative;
        display: inline-block;
        padding-bottom: 8px;
        margin-right: 20px;
        width: 65px;
        button {
          outline: none;
          cursor: pointer;
          border: none;
          margin: 0;
          padding: 0;
          color: ${props => props.theme.yellow};
          font-size: 1.6rem;
          font-weight: bold;
          background: transparent;
        }
        &:first-child::after {
          content: '';
          position: absolute;
          width: 100%;
          border-bottom: 2px solid rgb(255, 198, 0, 0.8);
          bottom: 0;
        }
      }
      .written {
        button {
          opacity: 1;
        }
        &::after {
          left: 0;
          animation: ${toWritten} 0.25s ease;
        }
      }
      .favs {
        button {
          opacity: 1;
        }
        &::after {
          left: 85px;
          animation: ${toLiked} 0.25s ease;
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

if (process.browser) {
  ReactModal.setAppElement('#__next')
}

class Account extends Component {
  state = {
    activeTab: 'written',
    isOpen: false,
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

  changeTab = tab => {
    this.setState({
      activeTab: tab,
    })
  }

  renderStories = (me, loading, error, stories, fetchMore) => {
    const { activeTab } = this.state
    if (loading || !stories) return <BigLoader />
    if (error) return <Error error={error} />
    return !stories.edges.length ? (
      <p>No stories</p>
    ) : (
      <StoriesGrid
        {...stories}
        userId={activeTab === 'written' ? me.id : null}
        fetchMore={fetchMore}
      />
    )
  }

  render() {
    const { activeTab, isOpen } = this.state
    return (
      <User>
        {({ data: { me } }) => (
          <Query
            query={
              activeTab === 'written'
                ? WRITTEN_STORIES_QUERY
                : LIKED_STORIES_QUERY
            }
            variables={activeTab === 'written' ? { userId: me.id } : undefined}
            fetchPolicy="cache-and-network"
          >
            {({ data: { stories }, loading, error, fetchMore }) => (
              <PleaseSignIn isAuth={!!me}>
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
                      <li className={activeTab}>
                        <span>
                          <button
                            type="button"
                            role="tab"
                            onClick={() => {
                              this.changeTab('written')
                            }}
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
                            onClick={() => {
                              this.changeTab('favs')
                            }}
                          >
                            Favs
                          </button>
                        </span>
                      </li>
                    </ul>
                  </nav>
                  {this.renderStories(me, loading, error, stories, fetchMore)}
                </AccountStyles>
                {isOpen && (
                  <ReactModal
                    onRequestClose={this.closeModal}
                    isOpen={isOpen}
                    style={customStyles}
                  >
                    <DropAndCrop userId={me.id} afterSave={this.closeModal} />
                  </ReactModal>
                )}
              </PleaseSignIn>
            )}
          </Query>
        )}
      </User>
    )
  }
}

export default Account
