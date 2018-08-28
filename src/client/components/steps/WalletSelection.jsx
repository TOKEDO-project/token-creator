import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToken } from '../../redux/addToken'

class WalletSelection extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }
  render () {
    const { addToken, nextFunction } = this.props

    return (
      <div>
        <div>Select the wallet</div>
        <button onClick={nextFunction}>Create Token</button>
      </div>
    )
  }
}

export default connect(s => s)(WalletSelection)
