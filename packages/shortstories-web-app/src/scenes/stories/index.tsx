import * as React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import Measure from 'react-measure'
import { Grid } from 'mauerwerk'
import { Story } from 'components'
import Header from './header'
import { GET_STORIES } from '../../queries/story'
import { IStory } from '../../interfaces/story'

const StyledGrid = styled(Grid)`
  height: calc(100vh - 80px) !important;
`

// For responsive
const getColumns = (width: number): number => {
  if (width >= 1200) {
    return 4
  } else if (width < 1200 && width >= 992) {
    return 3
  } else if (width < 992 && width >= 768) {
    return 2
  }
  return 1
}

class StoriesList extends React.PureComponent<any> {
  public state = {
    dimensions: {
      width: -1,
    },
  }

  public componentDidMount() {
    this.props.refetch()
  }

  public render() {
    const { loadMore, hasNextPage, stories } = this.props
    const { width } = this.state.dimensions
    return (
      <main>
        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ dimensions: contentRect.bounds })
          }}
        >
          {({ measureRef }) => (
            <div ref={measureRef}>
              <StyledGrid
                data={stories}
                keys={(d: IStory) => d.id}
                columns={getColumns(width) || 4}
                heights={(d: IStory) => d.body.length / 3}
                margin={20}
                lockScroll
                closeDelay={250}
              >
                {(data: any, maximized: any, toggle: any) => {
                  return (
                    <Story {...data} maximized={maximized} toggle={toggle} />
                  )
                }}
              </StyledGrid>
            </div>
          )}
        </Measure>
        {hasNextPage && <button onClick={loadMore}>MORE</button>}
      </main>
    )
  }
}

const Stories = ({ me }: any) => (
  <Query query={GET_STORIES}>
    {({ data, loading, fetchMore, refetch }) => {
      const { stories } = data

      if (loading || !stories) {
        return <p>loading...</p>
      }

      const { edges, pageInfo } = stories
      return (
        <>
          <Header me={me} />
          <StoriesList
            me={me}
            hasNextPage={pageInfo.hasNextPage}
            stories={edges}
            loadMore={() =>
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
            refetch={refetch}
          />
        </>
      )
    }}
  </Query>
)

export default Stories
