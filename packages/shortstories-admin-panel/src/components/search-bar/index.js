import * as React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  width: 50%;
  > input {
    width: 100%;
    margin: 15px;
    height: 30px;
    padding: 5px;
    outline: none;
  }
`

class SearchBar extends React.PureComponent {

  state = {
    filter: ''
  }

  dataSearchBar = (event) => {
    let data = []
    this.setState({
      filter: event.target.value
    })
    this.props.data.forEach((item) => {
      let regexp = this.state.filter.toLowerCase()
      let itsDataFound = item.name.toLowerCase().match(regexp);
      itsDataFound && data.push(itsDataFound)
      // console.log(data && data)
    })
  }

  render() {
    return (
      <Container>
        <input type="text"
               placeholder="filter..."
               onChange={this.dataSearchBar}/>
      </Container>
    )
  }
}

SearchBar.propTypes = {
  data: PropTypes.any
}

export default SearchBar