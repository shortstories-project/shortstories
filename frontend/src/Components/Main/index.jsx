import React, { Fragment } from 'react'
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
  stories: Array,
  dispatch: () => {}
}

const Main = ({ stories, dispatch }: Props) => (
  <Fragment>
    <Stories stories={stories} />
    <ButtonWrapper>
      <Button
        extStyle={{ width: '180px' }}
        onClick={() => dispatch(push('create-story'))}
      >
        Create story
      </Button>
    </ButtonWrapper>
  </Fragment>
)

export default connect()(Main)
