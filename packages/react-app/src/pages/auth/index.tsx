import * as React from 'react'
import { GridContainer, GridRow, GridColumn } from 'components/grid'

class Auth extends React.PureComponent<any, any> {
  public render() {
    return (
      <GridContainer>
        <GridRow center>
          <GridColumn lg={4} md={3} />
          <GridColumn lg={4} md={6}>
            <div>
              <h2>Login</h2>
              <p>with Google</p>
              <p>with Facebook</p>
              <p>with Twitter</p>
            </div>
          </GridColumn>
          <GridColumn lg={4} md={3} />
        </GridRow>
      </GridContainer>
    )
  }
}

export default Auth
