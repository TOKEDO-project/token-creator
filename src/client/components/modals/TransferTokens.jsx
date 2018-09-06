import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import transferToken from '../../assets/images/transfer-token.svg'
import Modal from '../Modal'
import EthereumAddress from '../steps/EthereumAddress'
import TransferTokenAmount from '../steps/TransferTokenAmount'
import WalletSelection from '../steps/WalletSelection'
import prepareTransferTokenTransaction from '../../utils/prepareTransferTokenTransaction'

class TransferTokens extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      address: null,
      amount: null,
      visible: true,
      transaction: null
    }
  }
  toggleVisibility = () => {
    const { history, tokenId } = this.props
    // this.setState({ visible: !this.state.visible })
    history.push(`/token/details/${tokenId}`)
  }

  setValidAddress = (address) => {
    const { amount } = this.state
    this.setState({
      address
    })
    if (amount) {
      this.prepareTransaction(address, amount)
    }
  }

  setValidAmount = (amount) => {
    const { address } = this.state
    this.setState({
      amount
    })
    if (address) {
      this.prepareTransaction(address, amount)
    }
  }

  prepareTransaction = async (address, amount) => {
    const { web3, tokens, tokenId } = this.props
    const transactionHash = tokens.receipts[tokenId].transactionHash
    const tokenType = tokens.transactions[transactionHash].type
    const transaction = await prepareTransferTokenTransaction({ web3, tokenType, tokenAddress: tokenId, to: address, tokenAmount: amount })
    this.setState({
      transaction,
      loading: false
    })
  }

  onTransactionHash = (transactionHash) => {
    /* const { dispatch, web3, tokenId } = this.props
    console.log('OTH:', web3.address, tokenId)
    dispatch(setState({ state: 'token-transferred', tokenAddress: tokenId }))
    dispatch(saveTransaction(tokenId, transactionHash, { userAddress: web3.address, tokenAddress: tokenId })) */
  }

  onReceipt = (receipt) => {
    /* const { dispatch, tokenId, addMainTokenSale: { amount } } = this.props
    dispatch(saveTransferReceipt(tokenId, receipt, amount)) */
  }
  changeAmount = (e) => {
    e.preventDefault()
    this.setState({
      transaction: null
    })
  }
  render () {
    const { t, tokenId } = this.props
    const { visible, transaction, address, amount } = this.state
    return (
      <Modal icon={transferToken} visible={visible} title={t('Transfer Tokens')} toggleVisibility={this.toggleVisibility}>
        {transaction
          ? <WalletSelection connectorName='transferToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
            <div className='top d-flex flex-row flex-h-start flex-v-center'>
              <div className='left'>
                <i className='far fa-question-circle' style={{ fontSize: '50px', color: 'grey' }} />
              </div>
              <div className='right d-flex flex-column flex-h-center'>
                <span className='title'>{t(`Transfer Token`)}:</span>
                <span className='description font-size-tiny'>
                  {t(`You need to make the transaction to transfer the tokens.`)}
                </span>
                <p>
                  {t('You are sending')}: {amount} {t('to')}: {address}  <button onClick={this.changeAmount}><i className='fas fa-undo-alt' /> Change the data</button>
                </p>
              </div>
            </div>
          </WalletSelection>
          : <div>
            <EthereumAddress onIsValidCB={this.setValidAddress} tokenId={tokenId} hideNextButton />
            <div className='separator-twentyfive' />
            <TransferTokenAmount onIsValidCB={this.setValidAmount} tokenId={tokenId} hideNextButton />
          </div>
        }
        <div className='separator-twentyfive' />

      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(TransferTokens)))
