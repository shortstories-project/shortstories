import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import map from 'ramda/src/map'
import merge from 'ramda/src/merge'
import concat from 'ramda/src/concat'
import gql from 'graphql-tag'
import { array, object, string, func } from 'prop-types'
import Button from './Button'
import ErrorMessage from './ErrorMessage'
import UserAndDate from './UserAndDate'
import { STORY_DATA_QUERY } from './SingleStory'
import { STORIES_QUERY } from './Stories'

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($id: ID!) {
    deleteComment(id: $id) {
      id
    }
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
  margin-bottom: 20px;
  textarea {
    border: 1px solid ${props => props.theme.grey};
    background-color: ${props => props.theme.white};
    font-family: 'Montserrat', serif;
    resize: none;
    min-height: 63px;
    padding: 20px;
    font-size: 1.6rem;
    &:focus {
      outline-color: ${props => props.theme.black};
    }
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
    .user-and-date {
      width: 100%;
    }
  }

  .edit-and-delete {
    display: flex;
    justify-content: flex-end;
    position: relative;
    top: -20px;
    right: -20px;
    button {
      cursor: pointer;
      outline: none;
      background-color: ${props => props.theme.white};
      border: none;
      width: 50px;
      height: 50px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.25s ease-in-out;
      img {
        width: 20px;
        height: 20px;
      }
      &:hover {
        background-color: ${props => props.theme.lightGrey};
      }
    }
  }

  li {
    position: relative;
    background-color: ${props => props.theme.white};
    margin-bottom: 20px;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid ${props => props.theme.grey};
    overflow: hidden;

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
      margin-top: 18px;
    }
  }
`

function editUpdate(cache, payload, id) {
  const data = cache.readQuery({ query: STORY_DATA_QUERY, variables: { id } })
  data.comments.edges = data.comments.edges.map(comment =>
    payload.data.updateComment.id === comment.id
      ? payload.data.updateComment
      : comment
  )
  cache.writeQuery({
    query: STORY_DATA_QUERY,
    variables: { id },
    data,
  })
}

function deleteUpdate(cache, payload, id) {
  const data = cache.readQuery({ query: STORY_DATA_QUERY, variables: { id } })
  data.comments.edges = data.comments.edges.filter(
    comment => comment.id !== payload.data.deleteComment.id
  )
  cache.writeQuery({
    query: STORY_DATA_QUERY,
    variables: { id },
    data,
  })
  try {
    const data = cache.readQuery({ query: STORIES_QUERY })
    data.stories.edges = data.stories.edges.map(story =>
      story.id === id
        ? {
            ...story,
            stats: { ...story.stats, comments: story.stats.comments - 1 },
          }
        : story
    )
    cache.writeQuery({
      query: STORIES_QUERY,
      data,
    })
  } catch (e) {
    // nothing
  }
}

function CommentEditor({
  comment,
  commentBody,
  id,
  onChange,
  me,
  resetAfterUpdate,
}) {
  return (
    <Mutation
      mutation={UPDATE_COMMENT_MUTATION}
      variables={{ id: comment.id, body: commentBody }}
      update={(cache, payload) => editUpdate(cache, payload, id)}
      optimisticResponse={{
        __typename: 'Mutation',
        updateComment: {
          __typename: 'Comment',
          id: comment.id,
          body: commentBody,
          user: {
            __typename: 'User',
            id: me.id,
          },
          createdAt: new Date().toISOString(),
        },
      }}
    >
      {(updateComment, { loading, error }) => (
        <Textarea>
          <ErrorMessage error={error} />
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
            onClick={async () => {
              await updateComment()
              resetAfterUpdate()
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
  resetAfterUpdate,
  activateEditMode,
}) {
  return edges.length > 0 ? (
    <Fragment>
      <List>
        {map(
          comment =>
            editId === comment.id ? (
              <CommentEditor
                resetAfterUpdate={resetAfterUpdate}
                comment={comment}
                commentBody={commentBody}
                onChange={onChange}
                id={id}
                me={me}
              />
            ) : (
              <li key={comment.id}>
                <div className="comment-header">
                  <UserAndDate
                    className="user-and-date"
                    user={comment.user}
                    date={comment.createdAt}
                  />
                  {me.id === comment.user.id && (
                    <div className="edit-and-delete">
                      <button
                        type="button"
                        onClick={() => {
                          activateEditMode(comment)
                        }}
                      >
                        <img src="/static/icons/edit.svg" alt="Edit" />
                      </button>
                      <Mutation
                        mutation={DELETE_COMMENT_MUTATION}
                        variables={{ id: comment.id }}
                        update={(cache, payload) =>
                          deleteUpdate(cache, payload, id)
                        }
                        optimisticResponse={{
                          __typename: 'Mutation',
                          deleteComment: {
                            __typename: 'Comment',
                            id: comment.id,
                          },
                        }}
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
          className="more-button"
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
    <p className="no-comments">No comments yet</p>
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
