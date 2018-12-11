import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import BigLoader from './BigLoader'
import Error from './ErrorMessage'
import StoriesGrid from './StoriesGrid'
import { STORIES_QUERY } from './Stories'
import getPhoto from '../lib/get-photo'

export const USER_QUERY = gql`
  query USER_QUERY($id: ID!) {
    user(id: $id) {
      id
      username
      photo
    }
  }
`

const UserProfileStyles = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  .photo-edit {
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
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    .username {
      font-size: 3.6rem;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
`

function UserProfile({ id }) {
  return (
    <Query query={USER_QUERY} variables={{ id }}>
      {({ loading, error, data }) => {
        if (error) return <Error error={error} />
        if (loading) return <BigLoader />
        return (
          <UserProfileStyles>
            <div className="user-info">
              <div className="photo-edit">
                <img
                  className="avatar"
                  src={getPhoto(data.user.photo)}
                  alt={data.user.username}
                />
              </div>
              <span className="username">{data.user.username}</span>
            </div>
            <Query query={STORIES_QUERY}>
              {({ data: { stories }, loading, error, fetchMore }) => {
                if (loading) return <BigLoader />
                if (error) return <Error error={error} />
                return !stories.edges.length ? (
                  <p>No stories</p>
                ) : (
                  <StoriesGrid {...stories} fetchMore={fetchMore} />
                )
              }}
            </Query>
          </UserProfileStyles>
        )
      }}
    </Query>
  )
}

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
}

export default UserProfile
