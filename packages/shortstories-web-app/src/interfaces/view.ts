import IUser from './user'

export default interface IView {
  id: string
  user: IUser
  storyId: string
}
