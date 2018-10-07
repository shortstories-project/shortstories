import IReaction from './reaction'
import IUser from './user'
import IView from './view'
import IComment from './comment'

export default interface IStory {
  id: string
  title: string
  body: string
  user: IUser
  likedBy: IReaction[]
  dislikedBy: IReaction[]
  viewedBy: IView[]
  comments: IComment[]
  createdAt: string
}
