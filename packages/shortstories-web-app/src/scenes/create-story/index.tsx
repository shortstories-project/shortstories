import * as React from 'react'
import { Mutation } from 'react-apollo'
import withAuthorization from 'higher-order-components/with-authorization'
import Header from './header'
import gql from 'graphql-tag'

const CREATE_STORY = gql`
  mutation($title: String!, $body: String!) {
    createStory(title: $title, body: $body) {
      id
      title
      body
      user {
        username
      }
      createdAt
    }
  }
`

const INITIAL_STATE = {
  title: '',
  body: '',
}

class CreateStory extends React.Component {
  public state = {
    ...INITIAL_STATE,
  }

  public onChange = (event: any) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  public onSubmit = (event: any, createStory: any) => {
    createStory().then(async ({ data }: any) => {
      this.setState({ ...INITIAL_STATE })
    })
    event.preventDefault()
  }

  public render() {
    const { title, body } = this.state
    return (
      <>
        <Header />
        <h1>Create Story</h1>
        <Mutation mutation={CREATE_STORY} variables={{ title, body }}>
          {(createStory, { data, loading, error }) => (
            <form onSubmit={event => this.onSubmit(event, createStory)}>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={title}
                onChange={this.onChange}
              />
              <textarea
                name="body"
                placeholder="Enter body"
                value={body}
                onChange={this.onChange}
              />
              <button type="submit">Create</button>
            </form>
          )}
        </Mutation>
      </>
    )
  }
}

export default withAuthorization(CreateStory)
