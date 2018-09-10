import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router'
import './MainTokenSaleAddToken.css'
import Loading from './Loading'
import WalletSelection from './steps/WalletSelection'
import MainTokenSaleAmount from './steps/MainTokenSaleAmount'
import { saveTransaction, saveTransferReceipt } from '../redux/mainTokenSales'
import { setState } from '../redux/addMainTokenSale'
import prepareTransferTokenTransaction from '../utils/prepareTransferTokenTransaction'
import { StepHeader } from './steps/parts/StepHeader'
import icon from '../assets/images/help.svg'
import { getTokenInfo } from '../utils/tokens'

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
    const token = getTokenInfo(tokenId, tokens)
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    const transaction = await prepareTransferTokenTransaction({ web3, tokenType: token.type, tokenAddress: tokenId, to: mainTokenSaleAddress, tokenAmount: amount, tokenDecimals: token.decimals })
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
    const { transaction, loading } = this.state
    const { match: { params: { tokenId } }, t, addMainTokenSale } = this.props
    const amount = addMainTokenSale[tokenId].amount

    if (loading) {
      return <Loading />
    }

    return (
      <div className='pure-u-1' id='MainTokenSaleAddToken'>
        <div className='separator-twentyfive' />
        {transaction
          ? <WalletSelection connectorName='mainTokenSaleAddToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
            <StepHeader
              icon={icon}
              title={t(`Allocate tokes`)}
            >
              {t(`This is the second transaction. You need to add the amount of token you want to transfer to this token sale. This is the total amount of token to be sold. You can change this value in the future.`)}
              <p>
                {t('You are adding')}: {amount} {t('tokens for sale')} <button onClick={this.changeAmount}><i className='fas fa-undo-alt' /> Change the amount</button>
              </p>
            </StepHeader>
            <div className='groupBottom pure-u-1 d-flex flex-v-center flex-h-between'>
              <p>
                {t('You are adding')}: {amount} {t('tokens for sale')}
              </p>
              <button className='btnOrng' onClick={this.changeAmount}><i className='fas fa-undo-alt' /> Change the amount</button>
            </div>
            <div className='separator-twentyfive' />
          </WalletSelection>
          : <MainTokenSaleAmount onIsValidCB={this.prepareTransaction} tokenId={tokenId} />
        }

      </div>
    )
  }
}

export default withRouter(translate('translations')(connect(s => s)(MainTokenSaleAddToken)))
