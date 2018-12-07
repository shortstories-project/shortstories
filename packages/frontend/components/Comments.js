import React, { Fragment, Component } from 'react'
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

class Comments extends Component {
  state = {
    body: '',
    editId: null,
    comment: '',
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { onChange, edges, pageInfo, fetchMore, id, me } = this.props
    const { body, editId, comment: commentBody } = this.state
    return (
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
                onChange={this.onChange}
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
                comment =>
                  editId === comment.id ? (
                    <Mutation
                      mutation={UPDATE_COMMENT_MUTATION}
                      variables={{ id: comment.id, body: commentBody }}
                    >
                      {(updateComment, { loading }) => (
                        <Textarea>
                          <TextareaAutosize
                            placeholder="Edit your comment..."
                            name="comment"
                            id={comment.id}
                            value={commentBody}
                            onChange={this.onChange}
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
                                  <img
                                    src="/static/icons/cross.svg"
                                    alt="Delete"
                                  />
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
  }
}

export default Comments
