import React from 'react'
import { connect } from 'react-redux'

import TokenName from '../components/steps/TokenName'
import TokenSymbol from '../components/steps/TokenSymbol'
import TokenDecimals from '../components/steps/TokenDecimals'
import TokenSupply from '../components/steps/TokenSupply'
import TokenType from '../components/steps/TokenType'

import WalletSelection from '../components/steps/WalletSelection'
import TermsAndConditions from '../components/TermsAndConditions'

import { setStep } from '../redux/addToken'
import prepareAddTokenTransaction from '../utils/prepareAddTokenTransaction'
import { onReceiptToken } from '../utils/onReceipt'
import Loading from '../components/Loading'
import { saveTransaction } from '../redux/tokens'

class AddTokenAdvanced extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,

      validName: false,
      validSymbol: false,
      validDecimals: false,
      validSupply: false,
      transaction: '',
      contractAddress: ''
    }
  }

  setContractAddress = (contractAddress) => {
    this.setState({
      contractAddress
    })
  }

  goToWalletSelection = async () => {
    const { web3, addToken, dispatch } = this.props
    const transaction = await prepareAddTokenTransaction({ web3, addToken })
    this.setState({
      transaction,
      loading: false
    })
    dispatch(setStep(6))
  }

  componentDidMount = async () => {
    const {web3, addToken} = this.props
    if (addToken.step === 6) {
      const transaction = await prepareAddTokenTransaction({ web3, addToken })
      this.setState({
        transaction,
        loading: false
      })
    }
  }

  // Set validators
  setValidName = (valid) => {
    this.setState({ validName: valid })
  }
  setValidSymbol = (valid) => {
    this.setState({ validSymbol: valid })
  }
  setValidDecimals = (valid) => {
    this.setState({ validDecimals: valid })
  }
  setValidSupply = (valid) => {
    this.setState({ validSupply: valid })
  }

  // is Valid function
  isValid = () => {
    const { validName, validSymbol, validDecimals, validSupply } = this.state
    return validName && validSymbol && validDecimals && validSupply
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

  render () {
    const { addToken: { name, symbol, decimals, supply, type, step }, preferences, loading, dispatch } = this.props
    const { transaction, contractAddress } = this.state
    if (!preferences.terms) {
      return <TermsAndConditions />
    }

    if (step === 6 && loading) {
      return <Loading />
    }

    return (<div>
      <div>
        <a href='/token/add/wizard'>wizard</a>
      </div>
      <h1>AddTokenAdvanced</h1>
      {step === 6 ? <WalletSelection connectorName='addToken' transaction={transaction} onTransactionHash={(transactionHash) => dispatch(saveTransaction(transactionHash, { name, symbol, decimals, supply, type }))} onReceipt={this.onReceipt} contractAddress={contractAddress} />
        : <div>
          <TokenName setValid={this.setValidName} />
          <TokenSymbol setValid={this.setValidSymbol} />
          <TokenDecimals setValid={this.setValidDecimals} />
          <TokenSupply setValid={this.setValidSupply} />
          <TokenType />
          {this.isValid() ? <button onClick={this.goToWalletSelection} >Select the wallet</button> : null}
        </div>
      }
    </div>)
  }
}

export default connect(s => s)(AddTokenAdvanced)
