import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setWalletType } from '../../redux/addToken'

import './WalletSelection.css'

class WalletSelection extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }
  onClick = (e) => {
    const { dispatch } = this.props
    dispatch(setWalletType(e.target.getAttribute('data-wallet')))
  }
  render () {
    const { addToken, nextFunction } = this.props

    return (
      <div id='WalletSelection'>
        <div>Select the wallet</div>
        <div className='pure-g'>
          <div data-wallet='metamask' onClick={this.onClick} className={`pure-u-1-2 item${addToken.walletType === 'metamask' ? ' selected' : ''}`}><p>Metamask</p></div>
          <div data-wallet='atomax' onClick={this.onClick} className={`pure-u-1-2 item${addToken.walletType === 'atomax' ? ' selected' : ''}`}><p>Atomax</p></div>
        </div>
        <button onClick={nextFunction}>Create Token</button>
      </div>
    )
  }
}

export default connect(s => s)(WalletSelection)
