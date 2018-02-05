import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Stories from './Stories'
import Button from '../Commons/Button'

type Props = {
  stories: Array,
  dispatch: () => {}
}

const Main = ({ stories, dispatch }: Props) => (
  <Fragment>
    <Stories stories={stories} />
    <Button onClick={() => dispatch(push('create-story'))}>
      Create story
    </Button>
  </Fragment>
)

export default connect()(Main)
