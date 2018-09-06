import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import minus from '../../assets/images/minus.svg'
import Modal from '../Modal'
import WalletSelection from '../steps/WalletSelection'
import TokenSaleRemoveAmount from '../steps/TokenSaleRemoveAmount'
import prepareTransferTokenTransaction from '../../utils/prepareTransferTokenTransaction'

class RemoveToken extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
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
  prepareTransaction = async (amount) => {
    const { web3, tokens, tokenId, mainTokenSales } = this.props
    const transactionHash = tokens.receipts[tokenId].transactionHash
    const tokenType = tokens.transactions[transactionHash].type
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    console.log('---------prepareTransaction', tokenType, tokenId, mainTokenSaleAddress, amount)
    const transaction = await prepareTransferTokenTransaction({web3, tokenType, tokenAddress: tokenId, mainTokenSaleAddress, tokenAmount: amount})
    this.setState({
      amount: amount,
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
    const { visible, transaction, amount } = this.state
    return (
      <Modal icon={minus} visible={visible} title={t('Remove Token')} toggleVisibility={this.toggleVisibility}>
        {transaction
          ? <WalletSelection connectorName='mainTokenSaleRemoveToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
            <div className='top d-flex flex-row flex-h-start flex-v-center'>
              <div className='left'>
                <i className='far fa-question-circle' style={{ fontSize: '50px', color: 'grey' }} />
              </div>
              <div className='right d-flex flex-column flex-h-center'>
                <span className='title'>{t(`Remove Token to Sale`)}:</span>
                <span className='description font-size-tiny'>
                  {t(`You need to make the transaction to an ethereum address to remove tokens to sale.`)}
                </span>
                <p>
                  {t('You are removing')}: {amount} {t('tokens from sale')} <button onClick={this.changeAmount}><i className='fas fa-undo-alt' /> Change the amount</button>
                </p>
              </div>
            </div>
          </WalletSelection>
          : <TokenSaleRemoveAmount onIsValidCB={this.prepareTransaction} tokenId={tokenId} />
        }
        <div className='separator-twentyfive' />

      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(RemoveToken)))
