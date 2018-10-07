import IComment from './comment'

export default interface IComments {
  edges: IComment[]
  pageInfo: {
    hasNextPage: boolean
    endCursor: string
  }
}
