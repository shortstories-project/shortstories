import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import gql from 'graphql-tag'
import compareDesc from 'date-fns/compare_desc'
import nanoid from 'nanoid'
import Button from './Button'
import ErrorMessage from './ErrorMessage'
import CommentsList from './CommentsList'
import { STORY_DATA_QUERY } from './SingleStory'
import { STORIES_QUERY } from './Stories'

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

const CommentsStyles = styled.div`
  max-width: 700px;
  margin: 0 auto;

  .no-comments {
    margin: 20px 0;
  }

  .more-button {
    width: 100%;
  }
`

function update(cache, payload, id) {
  const data = cache.readQuery({ query: STORY_DATA_QUERY, variables: { id } })
  data.comments.edges = [
    ...data.comments.edges,
    payload.data.createComment,
  ].sort((a, b) => compareDesc(a.createdAt, b.createdAt))
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
            stats: { ...story.stats, comments: story.stats.comments + 1 },
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

  resetAfterUpdate = () => {
    this.setState({
      editId: null,
      comment: '',
    })
  }

  activateEditMode = comment => {
    this.setState({
      editId: comment.id,
      comment: comment.body,
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
          resetAfterUpdate={this.resetAfterUpdate}
          activateEditMode={this.activateEditMode}
        />
      </CommentsStyles>
    )
  }
}

export default Comments
