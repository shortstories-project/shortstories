// @flow
import React from 'react'

const conditionalRender = (
  statement: boolean,
  f: React.Element,
  s = null,
) => (statement ? f : s)

export default conditionalRender
