import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { push } from 'react-router-redux'
import Layout from '../common/Layout'
import Button from '../common/Button'
import Preloader from '../common/Preloader'
import * as actions from '../../actions'

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
`

const OpenButton = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`

const Story = styled.div`
  padding: 0;
  margin: 0;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  color: #555;
  border: 1px solid #eee;
  box-sizing: border-box;
  cursor: ${props => (props.big ? 'pointer' : 'default')};
`

type Props = {
  fetchStories: Function,
  toCreate: Function,
  stories: Array,
}

class Home extends Component<Props> {
  componentDidMount() {
    this.props.fetchStories()
  }

  render() {
    const { stories, isFetching } = this.props.stories
    if (isFetching) {
      return <Preloader />
    }
    if (stories.length > 0) {
      return (
        <Wrapper>
          <Button onClick={() => this.props.toCreate()} style={{ width: '300px', marginBottom: '30px' }}>
            Create your story
          </Button>
          <Layout style={{ margin: '0 auto' }}>
            {stories.map((i) => {
              const story = i.text.length > 1500 ? `${i.text.slice(0, 1500)}...` : i.text
              if (i.text.length > 1500) {
                return (
                  <Story big key={i.id.toString()}>
                    {`${i.text.slice(0, 1500)}...`}
                    <OpenButton>Open full story</OpenButton>
                  </Story>
                )
              }
              return <Story key={i.id.toString()}>{story}</Story>
            })}
          </Layout>
        </Wrapper>
      )
    }
    return (
      <Wrapper>
        <Button onClick={() => this.props.toCreate()} style={{ width: '260px' }}>
          Create your story
        </Button>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchStories: () => dispatch(actions.fetchStories()),
  toCreate: () => dispatch(push('/create-story')),
})

const mapStateToProps = ({ stories }) => ({
  stories,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
