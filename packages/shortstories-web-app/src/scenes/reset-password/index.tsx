import * as React from 'react'
import { Helmet } from 'react-helmet'
import Form from './form'

interface IProps {
  match: {
    params: {
      token: string
    }
  }
  refetch: () => void
}

const ResetPassword = ({ match, refetch }: IProps) => (
  <section className="hero is-fullheight">
    <Helmet>
      <title>Shortstories | Reset password</title>
    </Helmet>
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-4-widescreen">
            <Form match={match} refetch={refetch} />
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default ResetPassword
