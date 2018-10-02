import * as React from 'react'
import { Helmet } from 'react-helmet'
import Form from './form'

interface IProps {
  refetch: () => void
}

const SignUp = (props: IProps) => (
  <section className="hero is-fullheight">
    <Helmet>
      <title>Shortstories | Sign up</title>
    </Helmet>
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-4-widescreen">
            <Form refetch={props.refetch} />
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default SignUp
