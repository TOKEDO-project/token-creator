import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSupply } from '../../redux/addToken'

class TokenSupply extends Component {
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
    dispatch(setSupply(value))
    this.setState({
      valid: textLength > 3
    })
  }

  render () {
    const { addToken, nextFunction } = this.props
    const { valid } = this.state

    return (
      <div>
        <div>Insert the total supply of your token:</div>
        <input value={addToken.supply} onChange={this.onChangeText} />
        {nextFunction ? <button disabled={!valid} onClick={nextFunction} >Next</button> : null}
        {!valid && addToken.supply.length > 0 ? <div>Stringa piu lunga di 3 caratteri</div> : null}
      </div>
    )
  }
}

export default connect(s => s)(TokenSupply)
