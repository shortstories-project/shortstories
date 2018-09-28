import { IStory } from './story'

export interface IUser {
  id: string
  username: string
  email: string
  role: string
  stories: IStory[]
}

export interface IInformationPage {
  like: number;
  star: number;
  view: number;
}