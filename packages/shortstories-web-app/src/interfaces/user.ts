import IStories from './stories'

export default interface IUser {
  id: string
  username: string
  photo: string
  writtenStories: IStories
}
