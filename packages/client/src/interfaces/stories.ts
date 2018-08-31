import { IStory } from './story'

export interface IStories {
  edges: IStory[]
  pageInfo: {
    hasNextPage: boolean
    endCursor: string
  }
}
