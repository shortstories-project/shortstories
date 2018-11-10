import styled from 'styled-components'
import Signin from '../components/Signin'

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 380px));
  justify-content: center;
`

const SigninPage = () => (
  <Columns>
    <Signin />
  </Columns>
)

export default SigninPage
