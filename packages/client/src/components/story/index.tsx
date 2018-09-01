import * as React from 'react'
import styled from 'styled-components'
import FullStory from './full'
import InGridStory from './in-grid'

interface IProps {
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

const Story = ({ toggle, title, body, maximized }: any) => (
  <StyledStory
    style={{ cursor: !maximized ? 'pointer' : 'auto' }}
    onClick={!maximized ? toggle : undefined}
  >
    <FullStory
      maximized={maximized}
      toggle={toggle}
      title={title}
      body={body}
    />
    <InGridStory maximized={maximized} title={title} body={body} />
  </StyledStory>
)

export default Story
