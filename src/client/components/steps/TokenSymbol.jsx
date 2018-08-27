import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSymbol } from '../../redux/addToken'

class TokenSymbol extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  onChangeText = (e) => {
    const value = e.target.value
    const textLength = value.length

    const { dispatch } = this.props
    dispatch(setSymbol(value))
    this.setState({
      valid: textLength > 3
    })
  }

  render () {
    const { addToken, nextFunction } = this.props
    const { valid } = this.state

    return (
      <div>
        <div>Insert the symbol of your token:</div>
        <input value={addToken.symbol} onChange={this.onChangeText} />
        {nextFunction ? <button disabled={!valid} onClick={nextFunction} >Next</button> : null}
        {!valid && addToken.symbol.length > 0 ? <div>Stringa piu lunga di 3 caratteri</div> : null}
      </div>
    )
  }
}

export default connect(s => s)(TokenSymbol)
