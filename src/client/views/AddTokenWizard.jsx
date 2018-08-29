import React, { Component } from 'react'
import { connect } from 'react-redux'

import TokenName from '../components/steps/TokenName'
import TokenSymbol from '../components/steps/TokenSymbol'
import TokenDecimals from '../components/steps/TokenDecimals'
import TokenSupply from '../components/steps/TokenSupply'
import TokenType from '../components/steps/TokenType'
import WalletSelection from '../components/steps/WalletSelection'
import TermsAndConditions from '../components/TermsAndConditions'
import { setStep } from '../redux/addToken'
import Loading from '../components/Loading'
import { saveTransaction } from '../redux/tokens'
import { onReceiptToken } from '../utils/onReceipt'
import prepareAddTokenTransaction from '../utils/prepareAddTokenTransaction'

class AddTokenWizard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      transaction: '',
      contractAddress: ''
    }
  }

  async componentDidMount () {

  }

  setContractAddress = (contractAddress) => {
    this.setState({
      contractAddress
    })
  }

  goToStep2 = () => {
    const { dispatch } = this.props
    dispatch(setStep(2))
  }

  goToStep3 = () => {
    const { dispatch } = this.props
    dispatch(setStep(3))
  }

  goToStep4 = () => {
    const { dispatch } = this.props
    dispatch(setStep(4))
  }

  goToStep5 = () => {
    const { dispatch } = this.props
    dispatch(setStep(5))
  }

  deployToken = async () => {
    const { web3, addToken, dispatch } = this.props
    dispatch(setStep(6))
    const transaction = await prepareAddTokenTransaction({ web3, addToken })
    this.setState({
      transaction,
      loading: false
    })
  }

  onReceipt = (receipt) => {
    const { dispatch } = this.props
    onReceiptToken(dispatch, receipt)
    if (receipt.contractAddress) {
      this.setState({
        contractAddress: receipt.contractAddress
      })
    }
  }

  renderStep (step) {
    const { addToken: { name, symbol, decimals, supply, type }, dispatch } = this.props
    const { transaction, contractAddress } = this.state
    switch (step) {
      case 1:
        return <TokenName nextFunction={this.goToStep2} />
      case 2:
        return <TokenSymbol nextFunction={this.goToStep3} />
      case 3:
        return <TokenDecimals nextFunction={this.goToStep4} />
      case 4:
        return <TokenSupply nextFunction={this.goToStep5} />
      case 5:
        return <TokenType nextFunction={this.deployToken} />
      case 6:
        return <WalletSelection connectorName='addToken' transaction={transaction} onTransactionHash={(transactionHash) => dispatch(saveTransaction(transactionHash, { name, symbol, decimals, supply, type }))
        } onReceipt={this.onReceipt} contractAddress={contractAddress} />
    }
  }

  render () {
    const { addToken, preferences } = this.props
    const {loading} = this.state
    if (!preferences.terms) {
      return <TermsAndConditions />
    }
    if (addToken.step === 6 && loading) {
      return <Loading />
    }
    return (
      <div>
        <div>Step: {addToken.step}</div>
        {this.renderStep(addToken.step)}
        {addToken.step === 6 ? null : <div><a href='/token/add/advanced'>advanced</a></div> }
      </div>
    )
  }
}

export default connect(s => s)(AddTokenWizard)
