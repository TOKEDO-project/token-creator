import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router'

import Loading from './Loading'
import WalletSelection from './steps/WalletSelection'
import MainTokenSaleAmount from './steps/MainTokenSaleAmount'
import { saveTransaction, saveTransferReceipt } from '../redux/mainTokenSales'
import { setState } from '../redux/addMainTokenSale'
import prepareTransferTokenTransaction from '../utils/prepareTransferTokenTransaction'

class MainTokenSaleAddToken extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transaction: null,
      loading: false
    }
  }

  prepareTransaction = async (amount) => {
    const { web3, tokens, tokenId, mainTokenSales } = this.props
    const transactionHash = tokens.receipts[tokenId].transactionHash
    const tokenType = tokens.transactions[transactionHash].type
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    const transaction = await prepareTransferTokenTransaction({web3, tokenType, tokenAddress: tokenId, mainTokenSaleAddress, tokenAmount: amount})
    this.setState({
      transaction,
      loading: false
    })
  }

  onTransactionHash = (transactionHash) => {
    const { dispatch, web3, tokenId } = this.props
    console.log('OTH:', web3.address, tokenId)
    dispatch(setState({ state: 'token-transferred', tokenAddress: tokenId }))
    dispatch(saveTransaction(tokenId, transactionHash, { userAddress: web3.address, tokenAddress: tokenId }))
  }

  onReceipt = (receipt) => {
    const { dispatch, tokenId, addMainTokenSale: { amount } } = this.props
    dispatch(saveTransferReceipt(tokenId, receipt, amount))
  }
  changeAmount = (e) => {
    e.preventDefault()
    this.setState({
      transaction: null
    })
  }
  render () {
    const {transaction, loading} = this.state
    const {match: {params: {tokenId}}, t, addMainTokenSale} = this.props
    const amount = addMainTokenSale[tokenId].amount

    if (loading) {
      return <Loading />
    }

    return (
      <div>
        <div className='separator-twentyfive' />
        {transaction
          ? <WalletSelection connectorName='mainTokenSaleAddToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
            <div className='top d-flex flex-row flex-h-start flex-v-center'>
              <div className='left'>
                <i className='far fa-question-circle' style={{ fontSize: '50px', color: 'grey' }} />
              </div>
              <div className='right d-flex flex-column flex-h-center'>
                <span className='title'>{t(`Allocate tokes`)}:</span>
                <span className='description font-size-tiny'>
                  {t(`This is the second transaction. You need to add the amount of token you want to transfer to this token sale. This is the total amount of token to be sold. You can change this value in the future.`)}
                </span>
                <p>
                  {t('You are adding')}: {amount} {t('tokens for sale')} <button onClick={this.changeAmount}><i class='fas fa-undo-alt' /> Change the amount</button>
                </p>
              </div>
            </div>
            <div className='separator-twentyfive' />
          </WalletSelection>
          : <MainTokenSaleAmount onChangeCB={this.prepareTransaction} tokenId={tokenId} />
        }

      </div>
    )
  }
}

export default withRouter(translate('translations')(connect(s => s)(MainTokenSaleAddToken)))
