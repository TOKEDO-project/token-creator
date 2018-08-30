import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setWalletType } from '../../redux/addToken'
import Atomax from '../wallet/Atomax'
import Metamask from '../wallet/Metamask'
import { translate } from 'react-i18next'
import TokenAddress from './TokenAddress'
import ResetAndBack from './ResetAndBack'
import './WalletSelection.css'
import './Step.css'
import './StepRadioButtons.css'
import icon from '../../assets/images/wallet-selection.svg'
import metamask from '../../assets/images/metamask.svg'
import atomax from '../../assets/images/atomax.svg'

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
    const { addToken, web3, transaction, onTransactionHash, onReceipt, contractAddress, connectorName, t } = this.props
    console.log('transaction WS', transaction)
    if (web3.loading || !transaction) {
      return <div>Loading...</div>
    }
    if (contractAddress) {
      return <TokenAddress contractAddress={contractAddress} />
    }
    return (
      <div id='WalletSelection' className='step shadow pure-u-1'>
        <div className='top d-flex flex-row flex-h-start flex-v-center'>
          <div className='left'>
            <img className='icon' src={icon} alt='Icon' />
          </div>
          <div className='right d-flex flex-column flex-h-center'>
            <span className='title'>{t(`Select the wallet`)}:</span>
            <span className='description'>{t(`To deploy the smart contract of your token you need an Ethereum address with a little balance of ETH. This address`)}</span>
          </div>
        </div>
        <form className='bottom d-flex flex-column flex-v-center'>
          <div className='pure-u-1 d-flex flex-row flex-h-center'>
            <button onClick={this.onClickMetamask} type='button' className={`radio-box ${addToken.walletType === 'metamask' ? ' active' : ''} shadow pure-u-11-24 pure-u-lg-8-24 d-flex flex-column flex-h-center flex-v-center`}>
              <img className='metamask' src={metamask} alt='Metamask' />
            Metamask
              <div className={`radio-button ${addToken.walletType === 'metamask' ? ' active' : ''} d-flex flex-row flex-h-center flex-v-center`}>
                <div className='radio-button-dot' />
              </div>
            </button>
            <button onClick={this.onClickAtomax} type='button' className={`radio-box ${addToken.walletType === 'atomax' ? ' active' : ''} shadow pure-u-11-24 pure-u-lg-8-24 d-flex flex-column flex-h-center flex-v-center`}>
              <img className='atomax' src={atomax} alt='Atomax' />
            Atomax
              <div className={`radio-button ${addToken.walletType === 'atomax' ? ' active' : ''} d-flex flex-row flex-h-center flex-v-center`}>
                <div className='radio-button-dot' />
              </div>
            </button>
          </div>
          {addToken.walletType === 'metamask' ? <Metamask transaction={transaction} onTransactionHash={onTransactionHash} onReceipt={onReceipt} /> : null}
          {addToken.walletType === 'atomax' ? <Atomax connectorName={connectorName} transaction={transaction} onTransactionHash={onTransactionHash} onReceipt={onReceipt} /> : null}
          <ResetAndBack />
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(WalletSelection))
