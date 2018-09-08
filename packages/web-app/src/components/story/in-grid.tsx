import * as React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Fade } from 'mauerwerk'

const LIKE = gql`
  mutation($id: ID!) {
    likeStory(id: $id) {
      id
    }
  }
`

const DISLIKE = gql`
  mutation($id: ID!) {
    dislikeStory(id: $id) {
      id
    }
  }
`

interface IProps {
  maximized: boolean
  title: string
  body: string
  id: any
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

function StoryInGrid({ maximized, title, body, id, likedBy, dislikedBy }: any) {
  return (
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
        <BottomGradient>
          {/* <Mutation
            mutation={
              likeStory: LIKE,
              dislikeStory: DISLIKE,
            }
            variables={{ id }}
          >
            {({ likeStory, dislikeStory }: any, { data }) => (
              <div>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    likeStory()
                  }}
                >
                  LIKE ({likedBy.length})
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    dislikeStory()
                  }}
                >
                  DISLIKE ({dislikedBy.length})
                </button>
              </div>
            )}
          </Mutation> */}
        </BottomGradient>
      </div>
    </Fade>
  )
}

export default StoryInGrid
