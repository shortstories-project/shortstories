// @flow
import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Stories from './Stories'
import Button from '../Commons/Button'
import Preloader from '../Commons/Preloader'

import { conditionalRender } from '../../Utils'

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
  dispatch: (func: Function) => {},
  isFetching: boolean,
}

const Main = ({ stories, dispatch, isFetching }: Props) => (
  <React.Fragment>
    <ButtonWrapper>
      <Button onClick={() => dispatch(push('create-story'))}>Create story</Button>
    </ButtonWrapper>
    <div>
      {conditionalRender(
        isFetching,
        <PreloadersWrapper>
          <Preloader />
          <Preloader />
          <Preloader />
        </PreloadersWrapper>,
        <Stories stories={stories} />,
      )}
    </div>
  </React.Fragment>
)

const mapStateToProps = ({ UI }) => ({
  isFetching: UI.storyFetching,
})

export default connect(mapStateToProps)(Main)
