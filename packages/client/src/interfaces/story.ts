import { IUser } from './user'

export interface IStory {
  id: string
  title: string
  body: string
  user: IUser
  createdAt: string
}
