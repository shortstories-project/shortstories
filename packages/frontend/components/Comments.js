import React, { Fragment } from 'react'
import { withState } from 'recompose'
import { map, merge, concat } from 'ramda'
import Link from 'next/link'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import TextareaAutosize from 'react-textarea-autosize'
import gql from 'graphql-tag'
import format from 'date-fns/format'
import Button from './Button'
import { STORY_DATA_QUERY } from './SingleStory'
import getPhoto from '../lib/get-photo'

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($id: ID!, $body: String!) {
    createComment(id: $id, body: $body) {
      id
      body
      user {
        id
      }
    }
  }
`

const Textarea = styled.div`
  display: flex;
  flex-direction: column;
  textarea {
    border: 1px solid gainsboro;
    resize: none;
    min-height: 60px;
    padding: 20px;
    font-size: 1.6rem;
    outline: none;
  }
`

const CommentsStyles = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

const CommentsList = styled.ul`
  margin: 0;
  margin-top: 20px;
  padding: 0;
  list-style-type: none;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  li {
    position: relative;
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid gainsboro;

    a {
      display: flex;
      width: 100%;
      align-items: center;
      height: 40px;
      > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-left: 10px;
        .username {
          font-size: 1.2rem;
        }
        .created-at {
          font-size: 1rem;
          font-weight: normal;
          color: #aaa;
        }
      }
    }

    .body {
      margin-top: 10px;
    }
  }
`

const Comments = withState('body', 'onChange', '')(
  ({ body, onChange, edges, pageInfo, fetchMore, id }) => (
    <CommentsStyles>
      <Mutation
        mutation={CREATE_COMMENT_MUTATION}
        variables={{ id, body }}
        refetchQueries={[{ query: STORY_DATA_QUERY, variables: { id } }]}
      >
        {(createComment, { loading }) => (
          <Textarea>
            <TextareaAutosize
              placeholder="Write your comment..."
              name="body"
              id="body"
              value={body}
              onChange={event => {
                onChange(event.target.value)
              }}
              maxLength={300}
            />
            <Button
              disabled={body.length === 0}
              loading={loading}
              type="button"
              onClick={() => {
                createComment().then(() => {
                  onChange('')
                })
              }}
            >
              Comment
            </Button>
          </Textarea>
        )}
      </Mutation>
      {edges.length > 0 && (
        <Fragment>
          <CommentsList>
            {map(
              comment => (
                <li key={comment.id}>
                  <Link href={`/user?id=${comment.user.id}`}>
                    <a>
                      <img
                        className="avatar"
                        src={getPhoto(comment.user.photo)}
                        alt={comment.user.username}
                      />
                      <div>
                        <span className="username">
                          {comment.user.username}
                        </span>
                        <span className="created-at">
                          {format(comment.createdAt, 'MMM D, YYYY')}
                        </span>
                      </div>
                    </a>
                  </Link>
                  <p className="body">{comment.body}</p>
                </li>
              ),
              edges
            )}
          </CommentsList>
          {pageInfo.hasNextPage && (
            <Button
              onClick={() => {
                fetchMore({
                  variables: {
                    cursor: pageInfo.endCursor,
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                      return previousResult
                    }

                    return {
                      comments: merge(fetchMoreResult.comments, {
                        edges: concat(
                          previousResult.comments.edges,
                          fetchMoreResult.comments.edges
                        ),
                      }),
                    }
                  },
                })
              }}
            >
              More
            </Button>
          )}
        </Fragment>
      )}
    </CommentsStyles>
  )
)

export default Comments
