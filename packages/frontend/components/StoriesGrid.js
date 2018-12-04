import React from 'react'
import { map, merge, concat } from 'ramda'
import PropTypes from 'prop-types'
import StoryItem from './StoryItem'
import Button from './Button'
import StoriesList from './styles/StoriesList'

function StoriesGrid({ edges, pageInfo, fetchMore, userId = null }) {
  return (
    <StoriesList>
      {map(
        (story, index) => (
          <StoryItem
            isStoryOwner={userId === story.user.id}
            key={story.id}
            index={index}
            {...story}
          />
        ),
        edges
      )}
      {pageInfo.hasNextPage && (
        <Button
          onClick={() => {
            fetchMore({
              variables: {
                cursor: pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return previousResult
                }

                return {
                  stories: merge(fetchMoreResult.stories, {
                    edges: concat(
                      previousResult.stories.edges,
                      fetchMoreResult.stories.edges
                    ),
                  }),
                }
              },
            })
          }}
        >
          More
        </Button>
      )}
    </StoriesList>
  )
}

StoriesGrid.propTypes = {
  edges: PropTypes.array.isRequired,
  pageInfo: PropTypes.object.isRequired,
  fetchMore: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
}

export default StoriesGrid
