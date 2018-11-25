import React from 'react'
import styled from 'styled-components'
import User from './User'
import PleaseSignIn from './PleaseSignIn'
import StoriesList from './styles/StoriesList'
import StoryItem from './StoryItem'

const AccountStyles = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
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
`

function Account() {
  return (
    <PleaseSignIn>
      <User>
        {({ data: { me } }) => (
          <AccountStyles>
            <div className="user-info">
              <img
                src={me.photo || '/static/user-placeholder.png'}
                alt={me.username}
              />
              <span className="username">{me.username}</span>
              <span className="email">{me.email}</span>
            </div>
            <StoriesList>
              {me.writtenStories.map((i, index) => (
                <StoryItem key={i.id} story={i} index={index} />
              ))}
            </StoriesList>
          </AccountStyles>
        )}
      </User>
    </PleaseSignIn>
  )
}

export default Account
