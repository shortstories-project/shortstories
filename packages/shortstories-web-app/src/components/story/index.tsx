import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { compose, withProps } from 'recompose'
import { format } from 'date-fns'
import withSession from '../../higher-order-components/with-session'
import FullStory from './full'
import InGridStory from './in-grid'
import { VIEW_STORY } from '../../constants/mutations'
import { GET_STORIES } from '../../constants/queries'

interface IProps {
  id: any
  maximized: boolean
  toggle: (e: any) => void
  title: string
  body: string
}

const StyledStory = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #777777;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.0625em 0.5em rgba(0, 0, 0, 0.3);
`

const updateCache = (cache: any, { data: { viewStory } }: any) => {
  const data = cache.readQuery({
    query: GET_STORIES,
  })
  data.stories.edges
    .find((i: any) => i.id === viewStory.storyId)
    .viewedBy.push(viewStory)
  cache.writeQuery({
    query: GET_STORIES,
    data,
  })
}

const enhance = compose(
  withSession,
  withProps((props: any) => ({
    ...props,
    createdAt: format(props.createdAt, 'MMMM DD, YYYY'),
    author: props.user.username,
    isAuth: Boolean(props.session.me),
    me: props.session.me,
  }))
)

const Story = enhance((props: any) => (
  <Mutation
    mutation={VIEW_STORY}
    variables={{ id: props.id }}
    update={updateCache}
  >
    {viewStory => (
      <StyledStory
        style={{ cursor: !props.maximized ? 'pointer' : 'auto' }}
        onClick={() => {
          if (!props.maximized) {
            viewStory()
            props.toggle()
          }
        }}
      >
        <FullStory {...props} views={props.viewedBy.length} />
        <InGridStory {...props} views={props.viewedBy.length} />
      </StyledStory>
    )}
  </Mutation>
))

export default withSession(Story)
