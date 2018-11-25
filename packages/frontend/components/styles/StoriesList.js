import styled from 'styled-components'

const StoriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

export default StoriesList
