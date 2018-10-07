import IUser from './user'

export default interface IReaction {
  id: string
  state: 'like' | 'dislike'
  user: IUser
  storyId: string
}
