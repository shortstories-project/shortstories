import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import format from 'date-fns/format'
import PropTypes from 'prop-types'
import Error from './ErrorMessage'
import BigLoader from './BigLoader'
import LikeButton from './LikeButton'
import DislikeButton from './DislikeButton'
import Comments from './Comments'
import User from './User'

const SINGLE_STORY_QUERY = gql`
  query SINGLE_STORY_QUERY($id: ID!) {
    story(id: $id) {
      id
      title
      body
      user {
        id
        username
        photo
      }
      likedBy {
        id
        userId
      }
      dislikedBy {
        id
        userId
      }
      viewedBy {
        id
      }
      comments {
        id
        body
        user {
          id
          photo
          username
        }
        createdAt
      }
      createdAt
    }
  }
`

const SingleStoryStyles = styled.div`
  max-width: 700px;
  margin: 0 auto;

  .title,
  .body-paragraph {
    font-family: 'Alegreya', serif;
    color: ${props => props.theme.black};
  }

  .title {
    font-size: 5rem;
    line-height: 5rem;
    font-weight: 600;
    margin: 20px 0;
  }

  .body-paragraph {
    margin-bottom: 2rem;
    font-size: 2.1rem;
    line-height: 1.4;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .author {
    display: flex;
    .avatar {
      width: 60px;
      height: 60px;
      display: block;
      margin-right: 15px;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      p,
      a {
        font-size: 1.6rem;
        margin: 0;
      }
    }

    .created-at {
      color: #aaa;
      font-size: 1.2rem;
    }
  }
`

const Toolbar = styled.aside`
  > .reaction-buttons {
    display: flex;
    margin: 20px auto;
    max-width: 700px;
  }
`

const SingleStory = ({ id }) => (
  <User>
    {({ data: { me } }) => (
      <Query query={SINGLE_STORY_QUERY} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />
          if (loading) return <BigLoader />
          if (!data.story) return <p>Story not found</p>
          const { story } = data
          return (
            <>
              <SingleStoryStyles>
                <Head>
                  <title>Shortstories | {story.title}</title>
                </Head>
                <div className="author">
                  <Link href={`/user?id=${story.user.id}`}>
                    <a className="avatar">
                      <img
                        src={story.user.photo || '/static/user-placeholder.png'}
                        alt={story.user.username}
                      />
                    </a>
                  </Link>
                  <div>
                    <Link href={`/user?id=${story.user.id}`}>
                      <a>{story.user.username}</a>
                    </Link>
                    <p className="created-at">
                      {format(+story.createdAt, 'MMM D, YYYY')}
                    </p>
                  </div>
                </div>
                <h1 className="title">{story.title}</h1>
                {story.body
                  .split('\n')
                  .filter(p => p !== '')
                  .map(p => (
                    <p className="body-paragraph">{p}</p>
                  ))}
              </SingleStoryStyles>
              {me && (
                <>
                  <Toolbar>
                    <div className="reaction-buttons">
                      <LikeButton
                        id={id}
                        qty={story.likedBy.length}
                        isLiked={story.likedBy.some(i => i.userId === me.id)}
                      />
                      <DislikeButton
                        id={id}
                        qty={story.dislikedBy.length}
                        isDisliked={story.dislikedBy.some(
                          i => i.userId === me.id
                        )}
                      />
                    </div>
                  </Toolbar>
                  <Comments id={id} comments={story.comments} />
                </>
              )}
            </>
          )
        }}
      </Query>
    )}
  </User>
)

SingleStory.propTypes = {
  id: PropTypes.string.isRequired,
}

export default SingleStory
export { SINGLE_STORY_QUERY }
