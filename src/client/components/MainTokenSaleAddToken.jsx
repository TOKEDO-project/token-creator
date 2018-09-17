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
import StepHeader from './steps/parts/StepHeader'
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
    const { dispatch, web3, tokenId, tokens } = this.props
    const tokenInfo = getTokenInfo(tokenId, tokens)
    dispatch(setState({ state: tokenInfo.type === 'simple' ? 'authorized' : 'token-transferred', tokenAddress: tokenId }))
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
              title={t(`Allocate tokens`)}
            >
              {t(`This transaction will move the selected amount of tokens to the smart contract of the Project. Remember, you will be able to add more tokens or remove some of them at a later time.`)}
            </StepHeader>
            <div className='groupBottom pure-u-1 d-flex flex-v-center'>
              <div className='pure-u-1 pure-u-sm-1 pure-u-md-2-3 pure-u-lg-3-5 pure-u-xl-3-5'>
                <p>
                  <span className='font-weight-bold'>{t('You are adding')}: </span>
                  {amount} {t('tokens for sale')}
                </p>
              </div>

              <div className='pure-u-1 pure-u-sm-1 pure-u-md-1-3 pure-u-lg-2-5 pure-u-xl-2-5'>
                <button className='btnChange' onClick={this.changeAmount}><i className='fas fa-undo-alt' /> Change the amount</button>
              </div>
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
