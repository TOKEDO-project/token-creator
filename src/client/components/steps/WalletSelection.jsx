import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setWalletType } from '../../redux/addToken'
import Atomax from '../wallet/Atomax'
import Metamask from '../wallet/Metamask'

import ResetAndBack from './ResetAndBack'
import './WalletSelection.css'

class WalletSelection extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }
  onClickMetamask = (e) => {
    const { dispatch } = this.props
    dispatch(setWalletType('metamask'))
  }
  onClickAtomax = (e) => {
    const { dispatch } = this.props
    dispatch(setWalletType('atomax'))
  }
  render () {
    const { addToken, nextFunction } = this.props

    return (
      <div id='WalletSelection'>
        <div>Select the wallet</div>
        <div className='pure-g'>
          <div onClick={this.onClickMetamask} className={`pure-u-1-2 item${addToken.walletType === 'metamask' ? ' selected' : ''}`}><p>Metamask</p></div>
          <div onClick={this.onClickAtomax} className={`pure-u-1-2 item${addToken.walletType === 'atomax' ? ' selected' : ''}`}><p>Atomax</p></div>
        </div>

        {addToken.walletType === 'metamask' ? <Metamask /> : null }

        {addToken.walletType === 'atomax' ? <Atomax name='addToken' to='0xf89baa73f7319bcb8a645f4c7a8e7cdb296acddb' value='0.1' /> : null }

        <button onClick={nextFunction}>Create Token</button>
        <ResetAndBack />
      </div>
    )
  }
}

export default connect(s => s)(WalletSelection)
