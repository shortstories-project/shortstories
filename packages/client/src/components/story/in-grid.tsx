import * as React from 'react'
import styled from 'styled-components'
import { Fade } from 'mauerwerk'

interface IProps {
  maximized: boolean
  title: string
  body: string
}

const BottomGradient = styled.div`
  background: linear-gradient(
    hsla(0, 0%, 100%, 0),
    hsla(0, 0%, 100%, 0.95),
    #fff
  );
  bottom: 0;
  display: block;
  padding-top: 30px;
  position: absolute;
  width: 100%;
`

const StoryInGrid = ({ maximized, title, body }: IProps) => (
  <Fade
    show={!maximized}
    from={{ opacity: 0, transform: 'translate3d(0,140px,0)' }}
    enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
    leave={{ opacity: 0, transform: 'translate3d(0,-50px,0)' }}
    delay={maximized ? 0 : 350}
  >
    <div className="story-in-grid">
      <h3>{title}</h3>
      {body.split('\n').map((paragraph: string, index: number) => (
        <p key={`story-in-grid-paragraph-${index}`}>{paragraph}</p>
      ))}
      <BottomGradient />
    </div>
  </Fade>
)

export default StoryInGrid
