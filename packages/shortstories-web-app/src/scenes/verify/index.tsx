import * as React from 'react'
import { Helmet } from 'react-helmet'
import VerifyMessage from './verify-message'

interface IProps {
  match: any
}

const Verify = ({ match }: IProps) => (
  <section className="hero is-fullheight">
    <Helmet>
      <title>Shortstories | Verify account</title>
    </Helmet>
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-4-widescreen">
            <VerifyMessage match={match} />
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Verify
