// @flow
import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Stories from './Stories'
import Button from '../Commons/Button'

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
`

type Props = {
  stories: Object[],
  dispatch: (func: Function) => {}
}

const Main = ({ stories, dispatch }: Props) => (
  <React.Fragment>
    <ButtonWrapper>
      <Button onClick={() => dispatch(push('create-story'))}>
        Create story
      </Button>
    </ButtonWrapper>
    <Stories stories={stories} />
  </React.Fragment>
)

export default connect()(Main)
