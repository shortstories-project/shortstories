import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as Masonry from 'masonry-layout'
import { graphql } from 'react-apollo'
import { compose, mapProps } from 'recompose'
import { equals } from 'ramda'
import { BigLoader, StoryCard } from 'components'
import { GET_STORIES } from '../../queries/story'
import * as routes from '../../constants/routes'
import IStory from '../../interfaces/story'
import IStories from '../../interfaces/stories'

interface IFetchMoreResult {
  fetchMoreResult?: IStories
}

interface IFetchMoreArgs {
  variables: {
    cursor: string
  }
  updateQuery: (
    stories: IStories,
    fetchMoreResult: IFetchMoreResult
  ) => IStories
}

interface IProps {
  stories?: IStory[]
  cursor?: string
  hasNext?: boolean
  loading: boolean
  error?: any[]
  refetch: () => void
  fetchMore: (fetchMoreArgs: IFetchMoreArgs) => void
}

const Grid = styled.main`
  margin: 0 auto;
`

class StoriesGrid extends React.Component<IProps> {
  grid: React.RefObject<HTMLDivElement>
  msnry: Masonry

  constructor(props) {
    super(props)
    this.grid = React.createRef()
  }

  componentDidMount() {
    const grid = this.grid.current
    this.msnry = new Masonry(grid, {
      itemSelector: '.story',
      columnWidth: 300,
      gutter: 20,
      fitWidth: true,
    })
  }

  getSnapshotBeforeUpdate(prevProps: IProps) {
    return equals(this.props.stories, prevProps.stories)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!snapshot) {
      this.msnry.reloadItems()
      this.msnry.layout()
    }
  }

  renderContent = () => {
    const { loading, stories } = this.props
    if (loading) return <BigLoader />
    if (!stories.length)
      return (
        <>
          <h2>No stories yet</h2>
          <Link to={routes.CREATE_STORY}>
            Be the first <span>🔥</span>
          </Link>
        </>
      )
    return stories.map(story => <StoryCard key={story.id} story={story} />)
  }

  render() {
    return <Grid innerRef={this.grid}>{this.renderContent()}</Grid>
  }
}

export default compose(
  graphql(GET_STORIES),
  mapProps(({ data }) => ({
    stories: data.stories ? data.stories.edges : null,
    cursor: data.stories ? data.stories.pageInfo.endCursor : null,
    hasNext: data.stories ? data.stories.pageInfo.hasNextPage : null,
    loading: data.loading,
    error: data.error,
    refetch: data.refetch,
    fetchMore: data.fetchMore,
  }))
)(StoriesGrid)
