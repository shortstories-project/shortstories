import React from 'react'

import Layout from './layout'
import Story from './story'

type Props = {
  stories: Array,
}

const Stories = ({ stories }: Props) => (
  <Layout>{stories.map(story => <Story key={story.id} story={story.text} />)}</Layout>
)

export default Stories
