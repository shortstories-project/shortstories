import * as React from 'react'
import { Helmet } from 'react-helmet'
import withAuthorization from 'higher-order-components/with-authorization'
import Header from './header'
import Form from './form'

const CreateStory = ({ me }: any) => (
  <>
    <Helmet>
      <title>Shortstories | Create story</title>
    </Helmet>
    <Header me={me} />
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-mobile is-12-tablet is-10-desktop is-10-widescreen">
              <Form me={me} />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)

export default withAuthorization(CreateStory)
