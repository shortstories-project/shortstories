import styled from 'styled-components'
import RequestReset from '../components/RequestReset'

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 380px));
  justify-content: center;
`

const RequestResetPage = () => (
  <Columns>
    <RequestReset />
  </Columns>
)

export default RequestResetPage
