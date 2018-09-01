import * as React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid } from 'mauerwerk'
import { Story } from 'components'
import { IStory } from '../../interfaces/story'

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

const StyledGrid = styled(Grid)`
  height: calc(100vh - 80px) !important;
`

const Stories = () => (
  <Query query={GET_STORIES}>
    {({ data, loading, fetchMore }) => {
      const { stories } = data

      if (loading || !stories) {
        return <p>loading...</p>
      }

      const { edges, pageInfo } = stories
      return (
        <main>
          <StyledGrid
            data={edges}
            keys={(d: IStory) => d.id}
            columns={4}
            heights={(d: IStory) => d.body.length / 3}
            margin={20}
            lockScroll
            closeDelay={250}
          >
            {(data: any, maximized: any, toggle: any) => {
              return <Story {...data} maximized={maximized} toggle={toggle} />
            }}
          </StyledGrid>
          {pageInfo.hasNextPage && (
            <button
              onClick={() =>
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
            >
              MORE
            </button>
          )}
        </main>
      )
    }}
  </Query>
)

export default Stories
