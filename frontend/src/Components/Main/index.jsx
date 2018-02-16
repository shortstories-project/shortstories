// @flow
import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

// Components
import Stories from './Stories'
import Button from '../Commons/Button'
import Preloader from '../Commons/Preloader'

// Actions
import * as actions from '../../Actions/Commons'

// Utils
import { conditionalRender } from '../../Utils'

// Styled components
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
`

const PreloadersWrapper = styled.div`
  display: flex;
  width: 100px;
  margin: 24px auto;
`

type Props = {
  stories: Object[],
  toCreateStory: Function,
  showModal: Function,
  isFetching: boolean,
  users: Object[]
}

const Main = ({ stories, toCreateStory, isFetching, users, showModal }: Props) => (
  <React.Fragment>
    <ButtonWrapper>
      <Button
        onClick={() => {
          if (users.length) toCreateStory()
          else showModal()
        }}
      >
        Create story
      </Button>
    </ButtonWrapper>
    {conditionalRender(
      isFetching,
      <PreloadersWrapper>
        <Preloader />
        <Preloader />
        <Preloader />
      </PreloadersWrapper>,
      <Stories stories={stories} />
    )}
  </React.Fragment>
)

const mapDispatchToProps = (dispatch) => ({
  showModal: () => dispatch(actions.showAuthModal()),
  toCreateStory: () => dispatch(push('create-story'))
})

const mapStateToProps = ({ UI }) => ({
  isFetching: UI.storyFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
