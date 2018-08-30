import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import Loading from './Loading'
import WalletSelection from './steps/WalletSelection'
import prepareCreateMainTokenSaleTransaction from '../utils/prepareCreateMainTokenSaleTransaction'
import { saveTransaction, saveReceipt } from '../redux/mainTokenSales'

class MainTokenSaleInit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transaction: null,
      loading: true
    }
  }

  async componentDidMount () {
    const { web3, tokenId } = this.props
    const transaction = await prepareCreateMainTokenSaleTransaction({web3, addMainTokenSale: {userAddress: web3.address, tokenAddress: tokenId}})
    this.setState({
      transaction,
      loading: false
    })
  }

  onTransactionHash = (transactionHash) => {
    const { dispatch, web3, tokenId } = this.props
    console.log('OTH:', web3.address, tokenId)
    dispatch(saveTransaction(tokenId, transactionHash, { userAddress: web3.address, tokenAddress: tokenId }))
  }

  onReceipt = (receipt) => {
    const { dispatch, tokenId } = this.props
    dispatch(saveReceipt(tokenId, receipt))
  }

  render () {
    const {transaction, loading} = this.state

    if (loading) {
      return <Loading />
    }

    return (
      <WalletSelection connectorName='addToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt} />
    )
  }
}

export default translate('translations')(connect(s => s)(MainTokenSaleInit))
