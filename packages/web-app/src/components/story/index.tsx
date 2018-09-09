import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { find, propEq, contains } from 'ramda'
import { compose, withProps } from 'recompose'
import { format } from 'date-fns'
import withSession from '../../higher-order-components/with-session'
import FullStory from './full'
import InGridStory from './in-grid'
import { VIEW_STORY } from '../../constants/mutations'
import { GET_STORIES } from '../../constants/queries'
import findAndUpdate from '../../utils/find-and-update'

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

const updateCache = (cache: any, viewStory: any, props: any) => {
  const data = cache.readQuery({
    query: GET_STORIES,
  })
  const list = data.stories.edges
  const story = find(propEq('id', viewStory.id))(list)
  // if (contains(props.me, story.viewedBy)) {
  //   cache.writeQuery({
  //     query: GET_STORIES,
  //     data: {
  //       ...data,
  //     },
  //   })
  //   return
  // }
  const updatedStories = findAndUpdate(
    viewStory.id,
    {
      viewedBy: [...story.viewedBy, { ...props.me }],
    },
    list
  )
  cache.writeQuery({
    query: GET_STORIES,
    data: {
      ...data,
      stories: {
        ...data.stories,
        edges: updatedStories,
      },
    },
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
    update={(cache, { data: { viewStory } }) => {
      updateCache(cache, viewStory, props)
    }}
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
        <FullStory {...props} />
        <InGridStory {...props} />
        <div style={{ fontWeight: 'bold', color: 'black' }}>
          {JSON.stringify(props.viewedBy.length)}
        </div>
      </StyledStory>
    )}
  </Mutation>
))

export default withSession(Story)
