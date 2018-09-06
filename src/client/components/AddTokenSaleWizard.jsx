import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import TokenSalePrice from '../components/steps/TokenSalePrice'
import TokenSaleAmount from '../components/steps/TokenSaleAmount'
import TokenSaleKyc from '../components/steps/TokenSaleKyc'
import TokenSaleMinContribution from '../components/steps/TokenSaleMinContribution'
import TokenSaleFundOwner from '../components/steps/TokenSaleFundOwner'
import WalletSelection from '../components/steps/WalletSelection'
import TermsAndConditions from '../components/TermsAndConditions'
import { setStep, reset } from '../redux/addTokenSale'
import Loading from '../components/Loading'
import prepareAddTokenSaleTransaction from '../utils/prepareAddTokenSaleTransaction'
import prepareAddRCTransaction from '../utils/prepareAddRCTransaction'

import { saveTransaction, saveReceipt } from '../redux/tokenSales'

import './AddTokenSaleWizard.css'
import TokenSaleStartEndTime from './steps/TokenSaleStartEndTime'
import { YoutubeVideo } from './YoutubeVideo'

class AddTokenSaleWizard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
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

  goToStep2 = (e) => {
    e.preventDefault()
    const { dispatch, tokenId } = this.props
    dispatch(setStep({tokenAddress: tokenId, step: 2}))
  }

  goToStep3 = (e) => {
    e.preventDefault()
    const { dispatch, tokenId } = this.props
    dispatch(setStep({tokenAddress: tokenId, step: 3}))
  }

  goToStep4 = (e) => {
    e.preventDefault()
    const { dispatch, tokenId } = this.props
    dispatch(setStep({tokenAddress: tokenId, step: 4}))
  }

  goToStep5 = (e) => {
    e.preventDefault()
    const { dispatch, tokenId } = this.props
    dispatch(setStep({tokenAddress: tokenId, step: 5}))
  }

  goToStep6 = (e) => {
    e.preventDefault()
    const { dispatch, tokenId } = this.props
    dispatch(setStep({ tokenAddress: tokenId, step: 6 }))
  }

  deployTokenSale = async (e) => {
    e.preventDefault()
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

  deployAddRc = async (tokenSaleAddress) => {
    const { web3, tokenId, mainTokenSales, dispatch } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    const transaction = await prepareAddRCTransaction({ web3, mainTokenSaleAddress, tokenSaleAddress })
    this.setState({
      transaction,
      loading: false
    })
    dispatch(setStep({tokenAddress: tokenId, step: 8}))
  }

  onReceipt = (receipt) => {
    const { dispatch, tokenId, mainTokenSales } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveReceipt({mainTokenSaleAddress, receipt}))
    if (receipt.contractAddress) {
      this.deployAddRc(receipt.contractAddress)
    }
  }

  onTransactionHash = (transactionHash) => {
    const { addTokenSale, dispatch, tokenId, mainTokenSales } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveTransaction({mainTokenSaleAddress, txId: transactionHash, tokenSale: addTokenSale[tokenId]}))
  }

  onReceiptRc = (receipt) => {
    const { history, dispatch, tokenId, mainTokenSales } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveReceipt({mainTokenSaleAddress, receipt}))
    dispatch(reset({tokenAddress: tokenId}))
    history.push(`/token/details/${tokenId}`)
  }

  onTransactionHashRc = (transactionHash) => {
    const { addTokenSale, dispatch, tokenId, mainTokenSales } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveTransaction({mainTokenSaleAddress, txId: transactionHash, tokenSale: addTokenSale[tokenId]}))
  }

  renderStep (step) {
    const { tokenId } = this.props
    const { transaction } = this.state
    switch (step) {
      case 1:
        return <TokenSalePrice nextFunction={this.goToStep2} tokenId={tokenId} />
      case 2:
        return <TokenSaleAmount nextFunction={this.goToStep3} tokenId={tokenId} />
      case 3:
        return <TokenSaleMinContribution nextFunction={this.goToStep4} tokenId={tokenId} />
      case 4:
        return <TokenSaleFundOwner nextFunction={this.goToStep5} tokenId={tokenId} />
      case 5:
        return <TokenSaleStartEndTime nextFunction={this.goToStep6} tokenId={tokenId} />
      case 6:
        return <TokenSaleKyc nextFunction={this.deployTokenSale} tokenId={tokenId} />
      case 7:
        return <WalletSelection connectorName='addTokenSale' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt} tokenId={tokenId} />
      case 8:
        return <WalletSelection connectorName='addRc' transaction={transaction} onTransactionHash={this.onTransactionHashRc} onReceipt={this.onReceiptRc} tokenId={tokenId} />
    }
  }

  render () {
    const { addTokenSale, preferences, tokenId, t } = this.props
    const { loading } = this.state
    const step = addTokenSale[tokenId].step
    if (!preferences.terms) {
      return <TermsAndConditions />
    }
    if (step === 7 && loading) {
      return <Loading />
    }
    return (
      <div id='token-sale-wizard' className='pure-u-1'>
        <div className='progress-container pure-u-1 d-flex flex-column'>
          <div className={`progress-title pure-u-${step * 4}-24`}>Step {step}</div>
          <div className='progress-bar shadow'>
            <div className={`progress-bar-content pure-u-${step * 4}-24`} />
          </div>
        </div>
        <div className='content pure-u-1 d-flex flex-column flex-md-row flex-h-between'>
          <YoutubeVideo id='cqZhNzZoMh8' shadow className='pure-u-1 pure-u-md-8-24' />
          <div className='step-container pure-u-1 pure-u-md-15-24 d-flex flex-column flex-v-center'>
            {this.renderStep(step)}
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(translate('translations')(connect(s => s)(AddTokenSaleWizard)))
