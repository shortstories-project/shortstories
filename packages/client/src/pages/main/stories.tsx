import './style.css'
import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid, Fade, Slug } from 'mauerwerk'

const GET_STORIES = gql`
  query($cursor: String) {
    stories(cursor: $cursor, limit: 100) @connection(key: "StoriesConnection") {
      edges {
        id
        title
        body
        createdAt
        user {
          id
          username
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

const Cell = ({ toggle, title, body, maximized }: any) => {
  return (
    <div
      className="cell"
      style={{ cursor: !maximized ? 'pointer' : 'auto' }}
      onClick={!maximized ? toggle : undefined}
    >
      <Fade show={maximized} delay={maximized ? 400 : 0}>
        <div className="details">
          <Slug delay={600}>
            <div className="close" onClick={toggle}>
              ╳
            </div>
            <h1>{title}</h1>
            {body.split('\n').map((p: string) => (
              <p>{p}</p>
            ))}
          </Slug>
        </div>
      </Fade>
      <Fade
        show={!maximized}
        from={{ opacity: 0, transform: 'translate3d(0,140px,0)' }}
        enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
        leave={{ opacity: 0, transform: 'translate3d(0,-50px,0)' }}
        delay={maximized ? 0 : 400}
      >
        <div className="default">
          <h3>{title}</h3>
          {body.split('\n').map((p: string) => (
            <p>{p}</p>
          ))}
          <div className="bottom-gradient" />
        </div>
      </Fade>
    </div>
  )
}

const StoriesList = ({ stories, onLoadMore, hasNextPage }: any) => {
  return (
    <>
      <Grid
        className="grid"
        data={stories}
        keys={(d: any) => d.id}
        columns={4}
        heights={(d: any) => {
          return d.body.length / 3
        }}
        margin={20}
        lockScroll
        closeDelay={250}
      >
        {(data: any, maximized: any, toggle: any) => {
          return <Cell {...data} maximized={maximized} toggle={toggle} />
        }}
      </Grid>
      {hasNextPage && <button onClick={onLoadMore}>more</button>}
    </>
  )
}

const Stories = ({ session }: any) => (
  <Query query={GET_STORIES}>
    {({ data, loading, fetchMore }) => {
      const { stories } = data

      if (loading || !stories) {
        return <p>loading...</p>
      }

      const { edges, pageInfo } = stories
      return (
        <>
          <StoriesList
            session={session}
            stories={edges}
            hasNextPage={pageInfo.hasNextPage}
            onLoadMore={() =>
              fetchMore({
                variables: {
                  cursor: pageInfo.endCursor,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  if (!fetchMoreResult) {
                    return previousResult
                  }

                  return {
                    stories: {
                      ...fetchMoreResult.stories,
                      edges: [
                        ...previousResult.stories.edges,
                        ...fetchMoreResult.stories.edges,
                      ],
                    },
                  }
                },
              })
            }
          />
        </>
      )
    }}
  </Query>
)

export default Stories
