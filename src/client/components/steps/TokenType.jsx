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
    const { dispatch } = this.props
    dispatch(setType(e.target.value))
  }

  render () {
    const { addToken, nextFunction } = this.props

    return (
      <div>
        <div>Insert the total supply of your token:</div>
        <form>
          Startable Burnable <input type='radio' name='tokenType' value='startable-burnable' checked={addToken.type === 'startable-burnable'} onChange={this.onChange} />
          Startable <input type='radio' name='tokenType' value='startable' checked={addToken.type === 'startable'} onChange={this.onChange} />
          Simple <input type='radio' name='tokenType' value='simple' checked={addToken.type === 'simple'} onChange={this.onChange} />
        </form>

        <button onClick={nextFunction} >Next</button>
      </div>
    )
  }
}

export default connect(s => s)(TokenType)
