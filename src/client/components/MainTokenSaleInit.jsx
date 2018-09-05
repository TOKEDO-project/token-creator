import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import Loading from './Loading'
import WalletSelection from './steps/WalletSelection'
import prepareCreateMainTokenSaleTransaction from '../utils/prepareCreateMainTokenSaleTransaction'
import { saveTransaction, saveReceipt } from '../redux/mainTokenSales'
import { setState } from '../redux/addMainTokenSale'

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
    dispatch(setState({ state: 'deployed', tokenAddress: tokenId }))
    dispatch(saveReceipt(tokenId, receipt))
  }

  render () {
    const { t } = this.props
    const {transaction, loading} = this.state

    if (loading) {
      return <Loading />
    }

    return (
      <WalletSelection connectorName='mainTokenSaleDeploy' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
        <div className='top d-flex flex-row flex-h-start flex-v-center'>
          <div className='left'>
            <i className='far fa-question-circle' style={{ fontSize: '50px', color: 'grey' }} />
          </div>
          <div className='right d-flex flex-column flex-h-center'>
            <span className='title'>{t(`Initialization`)}:</span>
            <span className='description font-size-tiny'>{t(`To add token sale you need to peerform 3 transaction for initialization. This is the first transaction.`)}</span>
          </div>
        </div>
        <div className='separator-twentyfive' />
      </WalletSelection>
    )
  }
}

export default translate('translations')(connect(s => s)(MainTokenSaleInit))
