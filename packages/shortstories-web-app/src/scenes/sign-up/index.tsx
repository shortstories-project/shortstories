import * as React from 'react'
import Form from './form'

interface IProps {
  refetch: () => void
}

const SignUp = (props: IProps) => (
  <section className="hero is-fullheight">
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
