import React from 'react'

import Layout from './Layout'
import Story from './Story'

type Props = {
  stories: Array
}

const Stories = ({ stories }: Props) => (
  <Layout>
    {stories.map(story => <Story key={story.id} story={story} />)}
  </Layout>
)

export default Stories
