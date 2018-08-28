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
    const { addToken, nextFunction, web3 } = this.props

    if (web3.loading) {
      return <div>Loading...</div>
    }

    return (
      <div id='WalletSelection'>
        <div>Select the wallet</div>
        <div className='pure-g'>
          <div onClick={this.onClickMetamask} className={`pure-u-1-2 item${addToken.walletType === 'metamask' ? ' selected' : ''}`}><p>Metamask</p></div>
          <div onClick={this.onClickAtomax} className={`pure-u-1-2 item${addToken.walletType === 'atomax' ? ' selected' : ''}`}><p>Atomax</p></div>
        </div>

        {addToken.walletType === 'metamask' ? <Metamask /> : null }

        {addToken.walletType === 'atomax' ? <Atomax /> : null }

        <ResetAndBack />
      </div>
    )
  }
}

export default connect(s => s)(WalletSelection)
