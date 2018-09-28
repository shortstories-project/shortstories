import * as React from 'react'
import { mapProps } from 'recompose'
import styled from 'styled-components'

interface IProps {
  className?: string
  error: string
}

const ErrorMessage = ({ error, className }: IProps) => (
  <span className={className}>{error}</span>
)

const Error = styled(ErrorMessage)`
  font-size: var(--description-font-size);
  font-family: var(--main-font);
  color: red;
`

export default mapProps<IProps, IProps>(({ error, className }: any) => ({
  error: error.includes('GraphQL error')
    ? error.replace('GraphQL error: ', '')
    : error,
  className,
}))(Error)
