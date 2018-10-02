// import * as React from 'react'
// import { Container, Row, Column } from 'components'
// import Header from './header'
// import Form from './form'

// interface IProps {
//   refetch: () => void
// }

// const SignUp = (props: IProps) => (
//   <>
//     <Header />
//     <Container>
//       <Row center>
//         <Column lg="4" md="3" sm="2" xs="1" />
//         <Column lg="4" md="6" sm="8" xs="10">
//           <Form refetch={props.refetch} />
//         </Column>
//         <Column lg="4" md="3" sm="2" xs="1" />
//       </Row>
//     </Container>
//   </>
// )

// export default SignUp

import * as React from 'react'

const SignUp = props => (
  <section className="hero is-fullheight">
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column">form</div>
        </div>
      </div>
    </div>
  </section>
)

export default SignUp
