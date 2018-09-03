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

  render () {
    const {transaction, loading} = this.state
    const {match: {params: {tokenId}}} = this.props

    if (loading) {
      return <Loading />
    }

    return (
      <div>
        <MainTokenSaleAmount onChangeCB={this.prepareTransaction} tokenId={tokenId} />
        <WalletSelection connectorName='mainTokenSaleAddToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt} />
      </div>
    )
  }
}

export default withRouter(translate('translations')(connect(s => s)(MainTokenSaleAddToken)))
