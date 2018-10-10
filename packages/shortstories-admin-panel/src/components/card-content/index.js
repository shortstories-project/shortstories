import * as React from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

const Card = styled.div`
  height: 350px;
  border: 10px solid #048a76;
  cursor: pointer;
  background-color: #00d1b2;
  box-shadow: 0 0 17px rgba(122, 107, 107, 0.5);
  transition: all 0.25s ease-out;
  > p {
    text-align: center;
    margin-top: 150px;
    font-size: 30px;
    font-weight: bold;
    color: #ffffff;
  }
  :hover {
    transform: scale(1.05);
    box-shadow: 0 15px 17px rgba(122, 107, 107, 0.5);
  }
`

class CardContent extends React.PureComponent {
  render() {
    return (
      <Card>
        <p>{this.props.content}</p>
      </Card>
    )
  }
}

CardContent.propTypes = {
  content: PropTypes.string,
}

export default CardContent
