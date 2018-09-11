import * as React from 'react'

interface IProps {
  error: {
    message: string
  }
}

const ErrorMessage = ({ error }: IProps) => (
  <div>
    <small>{error.message}</small>
  </div>
)

export default ErrorMessage
