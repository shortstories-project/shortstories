import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import TextareaAutosize from 'react-textarea-autosize'
import gql from 'graphql-tag'
import format from 'date-fns/format'
import PropTypes from 'prop-types'
import Button from './Button'
import { SINGLE_STORY_QUERY } from './SingleStory'

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
    height: 90px;
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

class Comments extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
  }

  state = {
    body: '',
  }

  writeComment = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { id, comments } = this.props
    const { body } = this.state
    return (
      <CommentsStyles>
        <Mutation
          mutation={CREATE_COMMENT_MUTATION}
          variables={{ id, body }}
          refetchQueries={[{ query: SINGLE_STORY_QUERY, variables: { id } }]}
        >
          {(createComment, { loading }) => (
            <Textarea>
              <TextareaAutosize
                placeholder="Write your comment..."
                name="body"
                id="body"
                value={body}
                onChange={this.writeComment}
                maxLength={300}
              />
              <Button
                disabled={body.length === 0}
                loading={loading}
                type="button"
                onClick={() => {
                  createComment().then(() => {
                    this.setState({
                      body: '',
                    })
                  })
                }}
              >
                Comment
              </Button>
            </Textarea>
          )}
        </Mutation>
        {comments.length > 0 && (
          <CommentsList>
            {comments.map(c => (
              <li key={c.id}>
                <Link href={`/user?id=${c.user.id}`}>
                  <a>
                    <img
                      className="avatar"
                      src={c.user.photo || '/static/user-placeholder.png'}
                      alt="avatar"
                    />
                    <div>
                      <span className="username">{c.user.username}</span>
                      <span className="created-at">
                        {format(+c.createdAt, 'MMM D, YYYY')}
                      </span>
                    </div>
                  </a>
                </Link>
                <p className="body">{c.body}</p>
              </li>
            ))}
          </CommentsList>
        )}
      </CommentsStyles>
    )
  }
}

export default Comments
