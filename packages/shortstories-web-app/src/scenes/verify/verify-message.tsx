import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { lifecycle, branch, compose, renderComponent } from 'recompose'
import { Link } from 'react-router-dom'
import { Loader, Logo } from 'components'
import * as routes from '../../constants/routes'
import { VERIFY_USER } from '../../mutations/user'

interface IMutation {
  variables: {
    token: string
  }
}

interface IProps {
  verify: (vars?: IMutation) => Promise<any>
  loading: boolean
  error?: any
}

const Container = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 16px;
`

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ErrorMessage = styled.p`
  font-family: var(--main-font);
  font-size: 16px;
  color: var(--black);
  font-weight: bold;
`

const SuccessMessage = styled.div`
  font-family: var(--main-font);
  font-size: 24px;
  color: var(--black);
  font-weight: bold;
  & > a {
    font-size: 16px;
    color: var(--purple);
    font-weight: bold;
  }
`

const LoadingComponent = () => (
  <Container>
    <Logo black />
    <CenterContainer>
      <Loader />
    </CenterContainer>
  </Container>
)

const withLoading = branch<IProps>(
  props => props.loading,
  renderComponent<IProps>(LoadingComponent)
)

const ErrorComponent = props => (
  <Container>
    <Logo black />
    <CenterContainer>
      {props.error.graphQLErrors.map(err => (
        <ErrorMessage>{err.message} 😵</ErrorMessage>
      ))}
    </CenterContainer>
  </Container>
)

const withError = branch<IProps>(
  props => Boolean(props.error),
  renderComponent<IProps>(ErrorComponent)
)

const enhance = compose<IProps, IProps>(
  lifecycle<IProps, {}>({
    componentDidMount() {
      this.props.verify()
    },
  }),
  withLoading,
  withError
)

const ComponentWithVerify = enhance(() => (
  <Container>
    <Logo black />
    <SuccessMessage>
      Your account is verified <span>🔥</span>
      <Link to={routes.CREATE_STORY}>
        Create your first story <span>✍️</span>
      </Link>
    </SuccessMessage>
  </Container>
))

const VerifyMessage = ({ match }) => (
  <Mutation mutation={VERIFY_USER} variables={{ token: match.params.token }}>
    {(verify, { loading, error }) => (
      <ComponentWithVerify verify={verify} loading={loading} error={error} />
    )}
  </Mutation>
)

export default VerifyMessage
