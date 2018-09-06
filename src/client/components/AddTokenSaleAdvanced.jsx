import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import Loading from '../components/Loading'
import TokenSalePrice from '../components/steps/TokenSalePrice'
import TokenSaleAmount from '../components/steps/TokenSaleAmount'
import TokenSaleKyc from '../components/steps/TokenSaleKyc'
import TokenSaleMinContribution from '../components/steps/TokenSaleMinContribution'
import TokenSaleFundOwner from '../components/steps/TokenSaleFundOwner'
import WalletSelection from '../components/steps/WalletSelection'
import TermsAndConditions from '../components/TermsAndConditions'
import { saveTransaction, saveReceipt } from '../redux/tokenSales'
import { setStep, reset } from '../redux/addTokenSale'
import prepareAddTokenSaleTransaction from '../utils/prepareAddTokenSaleTransaction'

import './AddTokenSaleAdvanced.css'
import TokenSaleStartEndTime from './steps/TokenSaleStartEndTime'

class AddTokenSaleAdvanced extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,

      validPrice: false,
      validAmount: false,
      validMinContribution: false,
      validFundOwner: false,
      transaction: ''
    }
  }

  componentDidMount = async () => {
    const { web3, addTokenSale, tokenId, mainTokenSales, tokens } = this.props
    if (addTokenSale[tokenId].step === 7) {
      const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
      const tokenTxId = tokens.receipts[tokenId].transactionHash
      const tokenDecimals = tokens.transactions[tokenTxId].decimals
      const transaction = await prepareAddTokenSaleTransaction({ web3, tokenSale: addTokenSale[tokenId], mainTokenSaleAddress, tokenDecimals })
      this.setState({
        transaction,
        loading: false
      })
    }
  }

  // Set validators
  setValidPrice = (valid) => {
    this.setState({ validPrice: valid })
  }
  setValidAmount = (valid) => {
    this.setState({ validAmount: valid })
  }
  setValidMinContribution = (valid) => {
    this.setState({ validMinContribution: valid })
  }
  setValidFundOwner = (valid) => {
    this.setState({ validFundOwner: valid })
  }

  // is Valid function
  isValid = () => {
    const { validPrice, validAmount, validMinContribution, validFundOwner } = this.state
    return validPrice && validAmount && validMinContribution && validFundOwner
  }

  onReceipt = (receipt) => {
    const { dispatch, history, tokenId, mainTokenSales } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveReceipt({ mainTokenSaleAddress, receipt }))
    if (receipt.contractAddress) {
      dispatch(reset({ tokenAddress: tokenId }))
      history.push(`/token/details/${tokenId}`)
    }
  }

  onTransactionHash = (transactionHash) => {
    const { addTokenSale, dispatch, tokenId, mainTokenSales } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveTransaction({ mainTokenSaleAddress, txId: transactionHash, tokenSale: addTokenSale[tokenId] }))
  }

  goToWalletSelection = async () => {
    const { web3, addTokenSale, tokenId, mainTokenSales, tokens, dispatch } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    const tokenTxId = tokens.receipts[tokenId].transactionHash
    const tokenDecimals = tokens.transactions[tokenTxId].decimals
    const transaction = await prepareAddTokenSaleTransaction({ web3, tokenSale: addTokenSale[tokenId], mainTokenSaleAddress, tokenDecimals })
    this.setState({
      transaction,
      loading: false
    })
    dispatch(setStep({tokenAddress: tokenId, step: 7}))
  }

  render () {
    const { addTokenSale, preferences, loading, t, tokenId } = this.props
    const { transaction } = this.state
    if (!preferences.terms) {
      return <TermsAndConditions />
    }

    const step = addTokenSale[tokenId].step
    if (step === 7 && loading) {
      return <Loading />
    }
    const valid = this.isValid()
    return (
      <div id='token-sale-advanced' className='pure-u-1'>
        {step === 7
          ? <WalletSelection connectorName='addToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt} tokenId={tokenId} />
          : <div className='big-card shadow pure-u-1 d-flex flex-column flex-v-center'>
            <div className='pure-u-1 d-flex flex-row flex-h-between flex-wrap'>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSalePrice setValid={this.setValidPrice} tokenId={tokenId} />
              </div>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSaleAmount setValid={this.setValidAmount} tokenId={tokenId} />
              </div>
            </div>
            <div className='pure-u-1 d-flex flex-row flex-h-between flex-wrap'>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSaleMinContribution setValid={this.setValidMinContribution} tokenId={tokenId} />
              </div>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSaleFundOwner setValid={this.setValidFundOwner} tokenId={tokenId} />
              </div>
            </div>
            <div className='pure-u-1 d-flex flex-row flex-h-between flex-v-end flex-wrap'>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSaleKyc tokenId={tokenId} />
              </div>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSaleStartEndTime tokenId={tokenId} />
              </div>
            </div>
            <div className='deploy-container pure-u-1 pure-u-md-12-24'>
              {valid ? <button className='deploy pure-u-1 font-weight-bold' onClick={this.goToWalletSelection} >{t('Select the wallet')}</button> : null}
            </div>
          </div>
        }
      </div>)
  }
}

export default withRouter(translate('translations')(connect(s => s)(AddTokenSaleAdvanced)))
