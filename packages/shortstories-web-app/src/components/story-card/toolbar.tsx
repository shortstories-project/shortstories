import * as React from 'react'
import styled from 'styled-components'
import ToolsButton from './tools-button'
import { CommentIcon, DislikeIcon, LikeIcon, ViewIcon } from '../icons'
import { GET_STORIES } from '../../queries/story'
import { LIKE_STORY, DISLIKE_STORY } from '../../mutations/story'

const BottomGradient = styled.div`
  background: linear-gradient(
    hsla(0, 0%, 100%, 0),
    hsla(0, 0%, 100%, 0.95),
    #fff
  );
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  padding-top: 64px;
  padding-left: 20px;
  padding-right: 20px;
  position: absolute;
  width: 100%;
`

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 55px;
`

const updateLikeCache = (cache: any, likeStory: any, meId: any) => {
  const data = cache.readQuery({
    query: GET_STORIES,
  })
  const story = data.stories.edges.find((i: any) => i.id === likeStory.storyId)
  const yourLike = story.likedBy.find((i: any) => i.user.id === meId)
  const yourDislike = story.dislikedBy.find((i: any) => i.user.id === meId)
  if (yourLike) {
    story.likedBy = story.likedBy.filter((i: any) => i.id !== yourLike.id)
    cache.writeQuery({
      query: GET_STORIES,
      data,
    })
    return
  }
  if (yourDislike) {
    story.dislikedBy = story.dislikedBy.filter(
      (i: any) => i.id !== yourDislike.id
    )
    data.stories.edges
      .find((i: any) => i.id === likeStory.storyId)
      .likedBy.push(likeStory)
    cache.writeQuery({
      query: GET_STORIES,
      data,
    })
    return
  }
  data.stories.edges
    .find((i: any) => i.id === likeStory.storyId)
    .likedBy.push(likeStory)
  cache.writeQuery({
    query: GET_STORIES,
    data,
  })
}

const updateDislikeCache = (cache: any, dislikeStory: any, meId: any) => {
  const data = cache.readQuery({
    query: GET_STORIES,
  })
  const story = data.stories.edges.find(
    (i: any) => i.id === dislikeStory.storyId
  )
  const yourDislike = story.dislikedBy.find((i: any) => i.user.id === meId)
  const yourLike = story.likedBy.find((i: any) => i.user.id === meId)
  if (yourDislike) {
    story.dislikedBy = story.dislikedBy.filter(
      (i: any) => i.id !== yourDislike.id
    )
    cache.writeQuery({
      query: GET_STORIES,
      data,
    })
    return
  }
  if (yourLike) {
    story.likedBy = story.likedBy.filter((i: any) => i.id !== yourLike.id)
    data.stories.edges
      .find((i: any) => i.id === dislikeStory.storyId)
      .dislikedBy.push(dislikeStory)
    cache.writeQuery({
      query: GET_STORIES,
      data,
    })
    return
  }
  data.stories.edges
    .find((i: any) => i.id === dislikeStory.storyId)
    .dislikedBy.push(dislikeStory)
  cache.writeQuery({
    query: GET_STORIES,
    data,
  })
}

export default function Toolbar({
  storyId,
  likes,
  yourLike,
  dislikes,
  yourDislike,
  views,
  yourView,
  comments,
  yourComment,
  meId,
}: any) {
  return (
    <BottomGradient>
      <Container>
        <ToolsButton Icon={() => <ViewIcon active={yourView} />} qty={views} />
        <ToolsButton
          Icon={() => <CommentIcon active={yourComment} />}
          qty={comments}
        />
        <ToolsButton
          mutationProps={{
            mutation: LIKE_STORY,
            variables: { id: storyId },
            update: (cache: any, { data: { likeStory } }: any) => {
              updateLikeCache(cache, likeStory, meId)
            },
          }}
          Icon={() => <LikeIcon active={yourLike} />}
          qty={likes}
        />
        <ToolsButton
          mutationProps={{
            mutation: DISLIKE_STORY,
            variables: { id: storyId },
            update: (cache: any, { data: { dislikeStory } }: any) => {
              updateDislikeCache(cache, dislikeStory, meId)
            },
          }}
          Icon={() => <DislikeIcon active={yourDislike} />}
          qty={dislikes}
        />
      </Container>
    </BottomGradient>
  )
}
