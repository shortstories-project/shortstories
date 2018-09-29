import * as React from 'react'
import { Mutation } from 'react-apollo'
import { VERIFY_USER } from '../../constants/mutations'

class VerifyPage extends React.Component<any> {
  componentDidMount() {
    this.props.verifyUser()
  }

  render() {
    const { data, loading } = this.props
    if (loading || !data) {
      return <p>LOADING...</p>
    }
    return data.verifyUser ? <div>verify</div> : <div>not verify</div>
  }
}

class Verify extends React.Component<any> {
  render() {
    const { match } = this.props
    return (
      <Mutation
        mutation={VERIFY_USER}
        variables={{ token: match.params.token }}
      >
        {(verifyUser, { data, error, loading }) => (
          <VerifyPage
            verifyUser={verifyUser}
            data={data}
            error={error}
            loading={loading}
          />
        )}
      </Mutation>
    )
  }
}

export default Verify
