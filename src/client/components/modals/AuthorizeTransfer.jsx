import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import authorize from '../../assets/images/authorize.svg'
import Modal from '../Modal'
import { WarningMessage } from '../WarningMessage'
import EthereumAddress from '../steps/EthereumAddress'
import WalletSelection from '../steps/WalletSelection'
import prepareSetAuthorizedTransaction from '../../utils/prepareSetAuthorizedTransaction'
import { saveAuthorizeTransferTokenTransaction, saveAuthorizeTransferTokenReceipt } from '../../redux/actions'

class AuthorizeTransfer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      address: '',
      validAddress: false,
      visible: true
    }
  }

  onChangeAddress = (address) => {
    console.log('Transfer Token address', address)
    this.setState({
      address
    })
  }

  onValidAddress = (validAddress) => {
    console.log('Transfer Token valid address', validAddress)
    this.setState({
      validAddress
    })
  }

  prepareTransaction = async (e) => {
    const { web3, tokenId, tokens } = this.props
    const { address } = this.state
    e.preventDefault()
    const transactionHash = tokens.receipts[tokenId].transactionHash
    const tokenType = tokens.transactions[transactionHash].type
    const transaction = await prepareSetAuthorizedTransaction({ web3, tokenType, tokenAddress: tokenId, authorizedAddress: address })
    this.setState({
      transaction,
      loading: false
    })
  }

  onTransactionHash = (transactionHash) => {
    const { dispatch, tokenId, mainTokenSales } = this.props
    const { address } = this.state
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveAuthorizeTransferTokenTransaction({ mainTokenSaleAddress, txId: transactionHash, address }))
  }

  onReceipt = (receipt) => {
    const { dispatch, tokenId, mainTokenSales, history } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveAuthorizeTransferTokenReceipt({ mainTokenSaleAddress, receipt }))
    history.push(`/token/details/${tokenId}`)
  }

  toggleVisibility = () => {
    const { history, tokenId } = this.props
    // this.setState({ visible: !this.state.visible })
    history.push(`/token/details/${tokenId}`)
  }

  render () {
    const { t, tokenId } = this.props
    const { visible, transaction, validAddress } = this.state
    return (
      <Modal icon={authorize} visible={visible} title={t('Authorize Transfer')} toggleVisibility={this.toggleVisibility}>
        <WarningMessage title={t('WARNING: This action cannot be undone.')} description={t('Be careful, if you confirm this you are going to delete your token.')} backgroundColor='#D93D3D' icon='exclamation-triangle' shadow />
        <div className='separator-twentyfive' />
        {transaction
          ? <WalletSelection connectorName='authorizeTransferToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
            <div className='marginTop top d-flex flex-row flex-h-start flex-v-center'>
              <div className='left'>
                <i className='far fa-question-circle' style={{ fontSize: '50px', color: 'grey' }} />
              </div>
              <div className='right d-flex flex-column flex-h-center'>
                <span className='title'>{t(`Authorize Transfer`)}:</span>
                <span className='description font-size-tiny'>
                  {t(`You need to make the transaction to authorize the transfer of the tokens.`)}
                </span>
              </div>
            </div>
            <div className='separator-twentyfive' />
          </WalletSelection>
          : <div className='d-flex flex-row'>
            <EthereumAddress onChangeAddress={this.onChangeAddress} onValidAddress={this.onValidAddress} tokenId={tokenId} hideNextButton />

            {validAddress ? <button onClick={this.prepareTransaction} className='btnNext next shadow pure-u-7-24' >{t('Next')}</button> : null}
          </div>
        }
        <div className='separator-twentyfive' />
      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(AuthorizeTransfer)))
