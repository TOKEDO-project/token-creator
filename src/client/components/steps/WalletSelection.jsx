import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setWalletType } from '../../redux/addToken'
import Atomax from '../wallet/Atomax'
import Metamask from '../wallet/Metamask'

import TokenAddress from './TokenAddress'
import ResetAndBack from './ResetAndBack'
import './WalletSelection.css'

// TODO: this can be stateless
class WalletSelection extends Component {
  onClickMetamask = (e) => {
    const { dispatch } = this.props
    dispatch(setWalletType('metamask'))
  }
  onClickAtomax = (e) => {
    const { dispatch } = this.props
    dispatch(setWalletType('atomax'))
  }

  render () {
    const { addToken, web3, transaction, onTransactionHash, onReceipt, contractAddress, connectorName } = this.props

    if (web3.loading) {
      return <div>Loading...</div>
    }
    if (contractAddress) {
      return <TokenAddress contractAddress={contractAddress} />
    }
    return (
      <div id='WalletSelection'>
        <div>Select the wallet</div>
        <div className='pure-u-1'>
          <div onClick={this.onClickMetamask} className={`pure-u-1-2 item${addToken.walletType === 'metamask' ? ' selected' : ''}`}><p>Metamask</p></div>
          <div onClick={this.onClickAtomax} className={`pure-u-1-2 item${addToken.walletType === 'atomax' ? ' selected' : ''}`}><p>Atomax</p></div>
        </div>

        {addToken.walletType === 'metamask' ? <Metamask transaction={transaction} onTransactionHash={onTransactionHash} onReceipt={onReceipt} /> : null }

        {addToken.walletType === 'atomax' ? <Atomax connectorName={connectorName} transaction={transaction} onTransactionHash={onTransactionHash} getContractAddress={this.setContractAddress} /> : null }

        <ResetAndBack />
      </div>
    )
  }
}

export default connect(s => s)(WalletSelection)
