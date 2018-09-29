import * as React from 'react'
import { Container, Row, Column } from 'components'
import Header from './header'
import Form from './form'

const ForgotPassword = () => (
  <>
    <Header />
    <Container>
      <Row center>
        <Column lg="4" md="3" sm="2" xs="1" />
        <Column lg="4" md="6" sm="8" xs="10">
          <Form />
        </Column>
        <Column lg="4" md="3" sm="2" xs="1" />
      </Row>
    </Container>
  </>
)

export default ForgotPassword
