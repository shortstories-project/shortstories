import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import Toolbar from './toolbar'
import * as routes from '../../constants/routes'
import IStory from '../../interfaces/story'
import IUser from '../../interfaces/user'

interface IProps {
  story: IStory
  className?: string
}

const StoryCard = ({ className = '', story }: IProps) => (
  <div
    style={{ height: story.body.length / 5 }}
    className={`${className} story`}
  >
    <div>
      <Link to={routes.USER(story.user.id)}>
        {story.user.photo ? (
          <img src={story.user.photo} alt="avatar" />
        ) : (
          <div className="default-avatar" />
        )}
      </Link>
      <div className="user-and-date">
        <Link to={routes.USER(story.user.id)}>{story.user.username}</Link>
        <p>{format(+story.createdAt, 'MMM D, YYYY')}</p>
      </div>
    </div>
    <h2>{story.title}</h2>
    <p>{story.body}</p>
    <Toolbar />
  </div>
)

const StyledStoryCard = styled(StoryCard)`
  width: 300px;
  margin-bottom: 20px;
  background-color: var(--white);
  padding: 15px;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;

  > div:first-child {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .user-and-date {
    a {
      font-size: 0.8rem;
      font-weight: bold;
    }
  }

  h2 {
    font-weight: bold;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.8rem;
  }

  .default-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(110deg, var(--pink), var(--purple));
    margin-right: 10px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  }
`

export default StyledStoryCard
