import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setType } from '../../redux/addToken'

class TokenType extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  onChange = (e) => {

  }

  render () {
    const { addToken, nextFunction } = this.props

    return (
      <div>
        <div>Insert the total supply of your token:</div>
        <form>
          Startable Burnable <input type='radio' name='tokenType' value='Startable Burnable' selected='selected' />
          Startable <input type='radio' name='tokenType' value='Startable' />
          Simple <input type='radio' name='tokenType' value='Simple' />
        </form>

        <button onClick={nextFunction} >Next</button>
      </div>
    )
  }
}

export default connect(s => s)(TokenType)
