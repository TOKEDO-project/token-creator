import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import Loading from './Loading'
import WalletSelection from './steps/WalletSelection'
import { saveTransaction, saveSetAuthorizedReceipt } from '../redux/mainTokenSales'
import { setState } from '../redux/addMainTokenSale'
import prepareSetAuthorized from '../utils/prepareSetAuthorizedTransaction'

class MainTokenSaleAuthorize extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transaction: null,
      loading: false
    }
  }

  async componentDidMount () {
    const { web3, tokenId, tokens, mainTokenSales } = this.props
    const transactionHash = tokens.receipts[tokenId].transactionHash
    const tokenType = tokens.transactions[transactionHash].type
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    const transaction = await prepareSetAuthorized({web3, tokenType, tokenAddress: tokenId, mainTokenSaleAddress})
    this.setState({
      transaction,
      loading: false
    })
  }

  onTransactionHash = (transactionHash) => {
    const { dispatch, web3, tokenId } = this.props
    dispatch(setState({state: 'authorized', tokenAddress: tokenId}))
    dispatch(saveTransaction(tokenId, transactionHash, { userAddress: web3.address, tokenAddress: tokenId }))
  }

  onReceipt = (receipt) => {
    const { dispatch, tokenId } = this.props
    dispatch(saveSetAuthorizedReceipt(tokenId, receipt))
  }

  render () {
    const { t } = this.props
    const {transaction, loading} = this.state

    if (loading) {
      return <Loading />
    }

    return (
      <div>
        <WalletSelection connectorName='mainTokenSaleAuthorize' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
          <div className='top d-flex flex-row flex-h-start flex-v-center'>
            <div className='left'>
              <i className='far fa-question-circle' style={{ fontSize: '50px', color: '#7D7D7D' }} />
            </div>
            <div className='right d-flex flex-column flex-h-center'>
              <span className='title'>{t(`Authorization`)}:</span>
              <span className='description font-size-tiny'>{t(`This is the final transaction. You need to authorize this token sale to move the token.`)}</span>
            </div>
          </div>
          <div className='separator-twentyfive' />
        </WalletSelection>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(MainTokenSaleAuthorize))
