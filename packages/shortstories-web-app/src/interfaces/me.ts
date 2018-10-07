import IStories from './stories'

export default interface IMe {
  id: string
  username: string
  photo: string
  email: string
  isVerified: boolean
  writtenStories: IStories
  likedStories: IStories
  viewedStories: IStories
}
