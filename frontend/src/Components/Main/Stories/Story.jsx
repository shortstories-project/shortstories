// @flow
import React from 'react'
import styled from 'styled-components'

import { getRandomInt } from '../../../Utils'

const StyledStory = styled.div`
  padding: 0;
  margin: 0;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  color: #555;
  border: 1px solid #eee;
  box-sizing: border-box;
  hyphens: auto;
  word-wrap: break-word;
`

type Props = {
  story: string,
}

const Story = ({ story }: Props) => {
  const storyLength: number = story.length
  const isLong: boolean = storyLength > 900
  return (
    <StyledStory long={isLong}>
      {isLong ? story.substring(0, getRandomInt(500, 1000)) : story}
    </StyledStory>
  )
}

export default Story
