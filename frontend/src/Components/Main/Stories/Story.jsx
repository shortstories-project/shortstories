import React from 'react'
import styled from 'styled-components'

const StyledStory = styled.div`
  padding: 0;
  margin: 0;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  color: #555;
  border: 1px solid #eee;
  box-sizing: border-box;
  cursor: ${props => (props.long ? 'pointer' : 'default')};
`

const OpenButton = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`

type Props = {
  story: string
}

const Story = ({ story }: Props) => (
  <StyledStory long={story.length > 1500}>
    {`${story.slice(0, 1500)}...`}
    <OpenButton>Open full story</OpenButton>
  </StyledStory>
)

export default Story
