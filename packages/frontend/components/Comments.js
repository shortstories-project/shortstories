import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import gql from 'graphql-tag'
import compareDesc from 'date-fns/compare_desc'
import format from 'date-fns/format'
import nanoid from 'nanoid'
import Button from './Button'
import ErrorMessage from './ErrorMessage'
import CommentsList from './CommentsList'
import { STORY_DATA_QUERY } from './SingleStory'

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($id: ID!, $body: String!) {
    createComment(id: $id, body: $body) {
      id
      body
      user {
        id
      }
      createdAt
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

function update(cache, payload, id) {
  const data = cache.readQuery({ query: STORY_DATA_QUERY, variables: { id } })
  console.log(payload.data.createComment)
  data.comments.edges = [
    ...data.comments.edges,
    payload.data.createComment,
  ].sort((a, b) => compareDesc(a.createdAt, b.createdAt))
  cache.writeQuery({
    query: STORY_DATA_QUERY,
    variables: { id },
    data,
  })
}

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
    const { edges, pageInfo, fetchMore, id, me } = this.props
    const { body, editId, comment: commentBody } = this.state
    return (
      <CommentsStyles>
        <Mutation
          mutation={CREATE_COMMENT_MUTATION}
          variables={{ id, body }}
          update={(cache, payload) => update(cache, payload, id)}
          optimisticResponse={{
            __typename: 'Mutation',
            createComment: {
              __typename: 'Comment',
              id: nanoid(10),
              body,
              user: {
                __typename: 'User',
                id: me.id,
              },
              createdAt: new Date().toISOString(),
            },
          }}
        >
          {(createComment, { loading, error }) => (
            <Textarea>
              <ErrorMessage error={error} />
              <ReactTextareaAutosize
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
                onClick={async () => {
                  await createComment()
                  this.setState({
                    body: '',
                  })
                }}
              >
                Comment
              </Button>
            </Textarea>
          )}
        </Mutation>
        <CommentsList
          edges={edges}
          editId={editId}
          commentBody={commentBody}
          onChange={this.onChange}
          id={id}
          me={me}
          pageInfo={pageInfo}
          fetchMore={fetchMore}
        />
      </CommentsStyles>
    )
  }
}

export default Comments
