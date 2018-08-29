import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setWalletType } from '../../redux/addToken'
import Atomax from '../wallet/Atomax'
import Metamask from '../wallet/Metamask'

import TokenAddress from './TokenAddress'
import ResetAndBack from './ResetAndBack'
import './WalletSelection.css'

class WalletSelection extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false,
      contractAddress: false
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
  setContractAddress = (contractAddress) => {
    this.setState({
      contractAddress
    })
  }
  render () {
    const { addToken, web3 } = this.props
    const { contractAddress } = this.state

    if (web3.loading) {
      return <div>Loading...</div>
    }
    if (contractAddress) {
      return <TokenAddress contractAddress={contractAddress} />
    }
    return (
      <div id='WalletSelection'>
        <div>Select the wallet</div>
        <div className='pure-g'>
          <div onClick={this.onClickMetamask} className={`pure-u-1-2 item${addToken.walletType === 'metamask' ? ' selected' : ''}`}><p>Metamask</p></div>
          <div onClick={this.onClickAtomax} className={`pure-u-1-2 item${addToken.walletType === 'atomax' ? ' selected' : ''}`}><p>Atomax</p></div>
        </div>

        {addToken.walletType === 'metamask' ? <Metamask getContractAddress={this.setContractAddress} /> : null }

        {addToken.walletType === 'atomax' ? <Atomax getContractAddress={this.setContractAddress} /> : null }

        <ResetAndBack />
      </div>
    )
  }
}

export default connect(s => s)(WalletSelection)
