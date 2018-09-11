import * as React from 'react'
import { Fade, Slug } from 'mauerwerk'

interface IProps {
  maximized: boolean
  toggle: (e: any) => void
  title: string
  body: string
  id: any
}

const FullStory = ({ maximized, toggle, id, title, body }: IProps) => (
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
