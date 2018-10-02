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
            <div className="column is-5-tablet is-4-desktop is-4-widescreen">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)

export default withAuthorization(CreateStory)
