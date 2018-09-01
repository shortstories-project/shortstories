import * as React from 'react'
import styled from 'styled-components'
import { Fade, Slug } from 'mauerwerk'

interface IProps {
  maximized: boolean
  toggle: (e: any) => void
  title: string
  body: string
}

const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  user-select: none;
  top: 40px;
  right: 40px;
  font-size: 26px;
  color: #000;
`

const FullStory = ({ maximized, toggle, title, body }: IProps) => (
  <Fade show={maximized} delay={maximized ? 400 : 0}>
    <div className="story-full">
      <Slug delay={600}>
        <div className="story-full__close" onClick={toggle}>
          ╳
        </div>
        <h1>{title}</h1>
        {body.split('\n').map((paragraph: string, index: number) => (
          <p key={`full-story-paragraph-${index}`}>{paragraph}</p>
        ))}
      </Slug>
    </div>
  </Fade>
)

export default FullStory
