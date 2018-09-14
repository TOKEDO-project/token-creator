import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setWalletType } from '../../redux/addToken'
import Atomax from '../wallet/Atomax'
import Metamask from '../wallet/Metamask'
import { translate } from 'react-i18next'
import ResetAndBack from './ResetAndBack'
import Loading from '../Loading'

import './WalletSelection.css'
import './Step.css'
import './StepRadioButtons.css'
import icon from '../../assets/images/wallet-selection.svg'
import metamask from '../../assets/images/metamask.svg'
import atomax from '../../assets/images/atomax.svg'
import { StepHeader } from './parts/StepHeader'

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
    const { addToken, web3, transaction, onTransactionHash, onReceipt, connectorName, t } = this.props
    console.log('transaction WS', transaction)
    if (web3.loading || !transaction) { return <Loading /> }
    return (
      <div id='wallet-selection' className='step alone pure-u-1 d-flex flex-column flex-h-between'>
        {this.props.children}
        <StepHeader
          icon={icon}
          title={t(`Choose a wallet`)}
        >
          {t('Remember')}:
          {t(` to send the transaction you need an Ethereum address with at least some ETH in the balance to pay for the fees of the Ethereum Network.`)}
        </StepHeader>
        <form className='bottom d-flex flex-column flex-v-center'>
          <div className='pure-u-1 pure-u-lg-4-5 d-flex flex-row flex-h-between flex-wrap'>
            <button onClick={this.onClickMetamask} type='button' className={`radio-box ${addToken.walletType === 'metamask' ? ' active' : ''} shadow pure-u-1 pure-u-sm-11-24 d-flex flex-column flex-h-center flex-v-center`}>
              <img className='metamask' src={metamask} alt='Metamask' />
            Metamask
              <div className={`radio-button ${addToken.walletType === 'metamask' ? ' active' : ''} d-flex flex-row flex-h-center flex-v-center`}>
                <div className='radio-button-dot' />
              </div>
            </button>
            <button onClick={this.onClickAtomax} type='button' className={`radio-box ${addToken.walletType === 'atomax' ? ' active' : ''} shadow pure-u-1 pure-u-sm-11-24 d-flex flex-column flex-h-center flex-v-center`}>
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
