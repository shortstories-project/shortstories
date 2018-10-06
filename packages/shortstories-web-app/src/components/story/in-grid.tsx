// import * as React from 'react'
// import styled from 'styled-components'
// import { Fade } from 'mauerwerk'
// import Tools from '../tools'

// interface IProps {
//   maximized: boolean
//   title: string
//   body: string
//   id: any
// }

// const BottomGradient = styled.div`
//   background: linear-gradient(
//     hsla(0, 0%, 100%, 0),
//     hsla(0, 0%, 100%, 0.95),
//     #fff
//   );
//   bottom: 0;
//   left: 0;
//   right: 0;
//   display: block;
//   padding-top: 30px;
//   padding-left: 20px;
//   padding-right: 20px;
//   position: absolute;
//   width: 100%;
// `

// function StoryInGrid(props: any) {
//   const likes = props.likedBy.length
//   const dislikes = props.dislikedBy.length
//   const views = props.viewedBy.length
//   const comments = props.comments.length
//   const yourLike = Boolean(
//     props.likedBy.find((like: any) => props.me && props.me.id === like.user.id)
//   )
//   const yourDislike = Boolean(
//     props.dislikedBy.find(
//       (dislike: any) => props.me && props.me.id === dislike.user.id
//     )
//   )
//   const yourView = Boolean(
//     props.viewedBy.find((view: any) => props.me && props.me.id === view.user.id)
//   )
//   const yourComment = Boolean(
//     props.comments.find(
//       (comment: any) => props.me && props.me.id === comment.user.id
//     )
//   )
//   return (
//     <Fade
//       show={!props.maximized}
//       from={{ opacity: 0, transform: 'translate3d(0,140px,0)' }}
//       enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
//       leave={{ opacity: 0, transform: 'translate3d(0,-50px,0)' }}
//       delay={props.maximized ? 0 : 350}
//     >
//       <div className="story-in-grid">
//         <h3>{props.title}</h3>
//         {props.body.split('\n').map((paragraph: string, index: number) => (
//           <p key={`story-in-grid-paragraph-${index}`}>{paragraph}</p>
//         ))}
//         <Tools
//           likes={likes}
//           yourLike={yourLike}
//           dislikes={dislikes}
//           yourDislike={yourDislike}
//           views={views}
//           yourView={yourView}
//           comments={comments}
//           yourComment={yourComment}
//           storyId={props.id}
//           meId={props.me && props.me.id}
//         />
//       </div>
//     </Fade>
//   )
// }

// export default StoryInGrid

import * as React from 'react'

const Stories = () => <div>sdasd</div>

export default Stories
