import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import Loading from '../components/Loading'
import TokenSalePrice from '../components/steps/TokenSalePrice'
import TokenSaleAmount from '../components/steps/TokenSaleAmount'
import TokenSaleKyc from '../components/steps/TokenSaleKyc'
import TokenSaleMinContribution from '../components/steps/TokenSaleMinContribution'
import WalletSelection from '../components/steps/WalletSelection'
import TermsAndConditions from '../components/TermsAndConditions'
import { saveTransaction, saveReceipt, saveAddRCReceipt } from '../redux/tokenSales'
import { setStep, reset, setTokenSaleAddress } from '../redux/addTokenSale'
import prepareAddTokenSaleTransaction from '../utils/prepareAddTokenSaleTransaction'
import prepareAddRCTransaction from '../utils/prepareAddRCTransaction'

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
      transaction: ''
    }
  }

  componentDidMount = async () => {
    const { addTokenSale, tokenId } = this.props
    let transaction = null
    if (addTokenSale[tokenId].step === 6) {
      transaction = await this.createAddTokenSaleTransaction()
    } else if (addTokenSale[tokenId].step === 7) {
      transaction = await this.createAddRCTransaction(addTokenSale.address)
    }
    this.setState({
      transaction
    })
  }

  createAddTokenSaleTransaction = async () => {
    const { web3, addTokenSale, tokenId, mainTokenSales, tokens } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    const tokenTxId = tokens.receipts[tokenId].transactionHash
    const tokenDecimals = tokens.transactions[tokenTxId].decimals
    const transaction = await prepareAddTokenSaleTransaction({ web3, tokenSale: addTokenSale[tokenId], mainTokenSaleAddress, tokenDecimals })
    return transaction
  }

  createAddRCTransaction = async (tokenSaleAddress) => {
    const { web3, tokenId, mainTokenSales } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    const transaction = await prepareAddRCTransaction({ web3, mainTokenSaleAddress, tokenSaleAddress })
    return transaction
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

  // is Valid function
  isValid = () => {
    const { validPrice, validAmount, validMinContribution } = this.state
    return validPrice && validAmount && validMinContribution
  }

  deployAddRc = async (tokenSaleAddress) => {
    const { tokenId, dispatch } = this.props
    const transaction = await this.createAddRCTransaction(tokenSaleAddress)
    this.setState({
      transaction
    })
    dispatch(setStep({ tokenAddress: tokenId, step: 7 }))
  }

  onReceipt = (receipt) => {
    const { dispatch, tokenId, mainTokenSales } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveReceipt({ mainTokenSaleAddress, receipt }))
    if (receipt.contractAddress) {
      dispatch(setTokenSaleAddress({ tokenAddress: tokenId, address: receipt.contractAddress }))
      this.deployAddRc(receipt.contractAddress)
    }
  }

  onTransactionHash = (transactionHash) => {
    const { addTokenSale, dispatch, tokenId, mainTokenSales } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveTransaction({ mainTokenSaleAddress, txId: transactionHash, tokenSale: addTokenSale[tokenId] }))
  }

  onReceiptRc = (receipt) => {
    const { history, dispatch, tokenId, mainTokenSales, addTokenSale } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    receipt.contractAddress = addTokenSale[tokenId].address
    dispatch(saveAddRCReceipt({ mainTokenSaleAddress, receipt }))
    dispatch(reset({ tokenAddress: tokenId }))
    history.push(`/token/details/${tokenId}`)
  }

  onTransactionHashRc = (transactionHash) => {
    const { addTokenSale, dispatch, tokenId, mainTokenSales } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveTransaction({ mainTokenSaleAddress, txId: transactionHash, tokenSale: addTokenSale[tokenId] }))
  }

  goToWalletSelection = async () => {
    const { tokenId, dispatch } = this.props
    const transaction = await this.createAddTokenSaleTransaction()
    this.setState({
      transaction,
      loading: false
    })
    dispatch(setStep({tokenAddress: tokenId, step: 6}))
  }

  render () {
    const { addTokenSale, preferences, t, tokenId } = this.props
    const { transaction } = this.state
    if (!preferences.terms) {
      return <TermsAndConditions />
    }

    const step = addTokenSale[tokenId].step
    console.log('STEP', step)
    const valid = this.isValid()
    return (
      <div id='token-sale-advanced' className='pure-u-1'>
        {step === 6
          ? <WalletSelection progressTitle={t('Send transaction 1/2')} progressMsg={t('Send the first transaction.')} connectorName='addTokenSale' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt} tokenId={tokenId} />
          : step === 7
            ? <WalletSelection progressTitle={t('Send transaction 2/2')} progressMsg={t('Send the second transaction.')} connectorName='addRc' transaction={transaction} onTransactionHash={this.onTransactionHashRc} onReceipt={this.onReceiptRc} tokenId={tokenId} />
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
                  <TokenSaleKyc tokenId={tokenId} />
                </div>
              </div>
              <div className='pure-u-1 d-flex flex-row flex-h-between flex-v-end flex-wrap'>
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
