import React, { Fragment } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import map from 'ramda/src/map'
import merge from 'ramda/src/merge'
import concat from 'ramda/src/concat'
import format from 'date-fns/format'
import gql from 'graphql-tag'
import { array, object, string, func } from 'prop-types'
import Button from './Button'
import { STORY_DATA_QUERY } from './SingleStory'
import getPhoto from '../lib/get-photo'

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($id: ID!) {
    deleteComment(id: $id)
  }
`

const UPDATE_COMMENT_MUTATION = gql`
  mutation UPDATE_COMMENT_MUTATION($id: ID!, $body: String!) {
    updateComment(id: $id, body: $body) {
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
    border: 1px solid ${props => props.theme.grey};
    resize: none;
    min-height: 60px;
    padding: 20px;
    font-size: 1.6rem;
    outline: none;
  }
`

const List = styled.ul`
  margin: 0;
  margin-top: 20px;
  padding: 0;
  list-style-type: none;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .comment-header {
    display: flex;
    align-items: center;
  }

  .edit-and-delete {
    display: flex;
    justify-content: flex-end;
    button {
      cursor: pointer;
      background: none;
      border: none;
      width: 20px;
      height: 20px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 16px;
      img {
        width: 100%;
        height: 100%;
      }
    }
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

function CommentEditor({ comment, commentBody, id, onChange }) {
  return (
    <Mutation
      mutation={UPDATE_COMMENT_MUTATION}
      variables={{ id: comment.id, body: commentBody }}
      refetchQueries={[{ query: STORY_DATA_QUERY, variables: { id } }]}
    >
      {(updateComment, { loading }) => (
        <Textarea>
          <ReactTextareaAutosize
            placeholder="Edit your comment..."
            name="comment"
            id={comment.id}
            value={commentBody}
            onChange={onChange}
            maxLength={300}
          />
          <Button
            disabled={commentBody.length === 0}
            loading={loading}
            type="button"
            onClick={() => {
              updateComment().then(() => {
                this.setState({
                  editId: null,
                  comment: '',
                })
              })
            }}
          >
            Save
          </Button>
        </Textarea>
      )}
    </Mutation>
  )
}

function CommentsList({
  edges,
  editId,
  commentBody,
  onChange,
  id,
  me,
  pageInfo,
  fetchMore,
}) {
  return edges.length > 0 ? (
    <Fragment>
      <List>
        {map(
          comment =>
            editId === comment.id ? (
              <CommentEditor
                comment={comment}
                commentBody={commentBody}
                onChange={onChange}
                id={id}
              />
            ) : (
              <li key={comment.id}>
                <div className="comment-header">
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
                  {me.id === comment.user.id && (
                    <div className="edit-and-delete">
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation()
                          this.setState({
                            editId: comment.id,
                            comment: comment.body,
                          })
                        }}
                      >
                        <img src="/static/icons/edit.svg" alt="Edit" />
                      </button>
                      <Mutation
                        mutation={DELETE_COMMENT_MUTATION}
                        refetchQueries={[
                          { query: STORY_DATA_QUERY, variables: { id } },
                        ]}
                        variables={{ id: comment.id }}
                      >
                        {deleteComment => (
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation()
                              deleteComment()
                            }}
                          >
                            <img src="/static/icons/cross.svg" alt="Delete" />
                          </button>
                        )}
                      </Mutation>
                    </div>
                  )}
                </div>
                <p className="body">{comment.body}</p>
              </li>
            ),
          edges
        )}
      </List>
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
  ) : (
    <p>No comments yet</p>
  )
}

CommentEditor.propTypes = {
  commentBody: string.isRequired,
  id: string.isRequired,
  comment: object.isRequired,
  onChange: func.isRequired,
}

CommentsList.propTypes = {
  edges: array.isRequired,
  editId: string,
  commentBody: string.isRequired,
  id: string.isRequired,
  me: object.isRequired,
  pageInfo: object.isRequired,
  fetchMore: func.isRequired,
  onChange: func.isRequired,
}

export default CommentsList
