// @flow
import React from 'react'
import styled from 'styled-components'

import { conditionalRender } from '../../../Utils'

const StyledStory = styled.div`
  cursor: ${isLong => (isLong ? 'pointer' : 'default')};
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

const BottomGradient = styled.span`
  background: linear-gradient(hsla(0,0%,100%,0),hsla(0,0%,100%,.75),#fff);
  display: block;
  position: absolute;
  bottom: 16px;
  padding-top: 30px;
  width: calc(100% - 40px);
`

type Props = {
  story: string,
}

const Story = ({ story }: Props) => {
  const storyLength: number = story.length
  const isLong: boolean = storyLength > 900
  return (
    <StyledStory isLong={isLong}>
      {conditionalRender(isLong, `${story.substring(0, 700)}...`, story)}
      {conditionalRender(isLong, <BottomGradient />)}
    </StyledStory>
  )
}

export default Story
