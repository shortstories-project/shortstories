import IStory from './story'

export default interface IStories {
  edges: IStory[]
  pageInfo: {
    hasNextPage: boolean
    endCursor: string
  }
}
