import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import Loading from './Loading'
import WalletSelection from './steps/WalletSelection'
import prepareCreateMainTokenSaleTransaction from '../utils/prepareCreateMainTokenSaleTransaction'

class MainTokenSaleInit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transaction: null,
      loading: true
    }
  }

  async componentDidMount () {
    const { web3, match: { params: { tokenId } } } = this.props
    const transaction = await prepareCreateMainTokenSaleTransaction({web3, addMainTokenSale: {userAddress: web3.address, tokenAddress: tokenId}})
    this.setState({
      transaction,
      loading: false
    })
  }

  render () {
    const {transaction, loading} = this.state

    if (loading) {
      return <Loading />
    }

    return (
      <WalletSelection connectorName='addToken' transaction={transaction} onTransactionHash={(transactionHash) => console.log(transactionHash)} onReceipt={(receipt) => console.log(receipt)} />

    )
  }
}

export default translate('translations')(connect(s => s)(MainTokenSaleInit))
