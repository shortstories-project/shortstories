import IUser from './user'

export default interface IComment {
  id: string
  body: string
  user: IUser
  createdAt: string
}
