import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TokenName from '../components/steps/TokenName'
import TokenSymbol from '../components/steps/TokenSymbol'
import TokenDecimals from '../components/steps/TokenDecimals'
import TokenSupply from '../components/steps/TokenSupply'
import TokenType from '../components/steps/TokenType'

import WalletSelection from '../components/steps/WalletSelection'
import TermsAndConditions from '../components/TermsAndConditions'

import { setStep, reset } from '../redux/addToken'
import prepareAddTokenTransaction from '../utils/prepareAddTokenTransaction'
import Loading from '../components/Loading'
import { saveTransaction, saveReceipt } from '../redux/tokens'
import './AddTokenAdvanced.css'

class AddTokenAdvanced extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,

      validName: false,
      validSymbol: false,
      validDecimals: false,
      validSupply: false,
      transaction: ''
    }
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
    const { web3, addToken } = this.props
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
    const { dispatch, history } = this.props
    dispatch(saveReceipt(receipt))
    if (receipt.contractAddress) {
      dispatch(reset())
      history.push(`/token/receipt/${receipt.contractAddress}`)
    }
  }

  onTransactionHash = (transactionHash) => {
    const { addToken: { name, symbol, decimals, supply, type }, dispatch } = this.props
    dispatch(saveTransaction(transactionHash, { name, symbol, decimals, supply, type }))
  }

  render () {
    const { addToken: { step }, preferences, loading, t } = this.props
    const { transaction } = this.state
    if (!preferences.terms) {
      return <TermsAndConditions />
    }

    if (step === 6 && loading) {
      return <Loading />
    }

    return (
      <div id='token-advanced' className='pure-u-22-24 pure-u-sm-20-24 pure-md-18-24'>
        <a className='wizard' href='/token/add/wizard'>{`< Back to wizard mode`}</a>
        {step === 6 ? <WalletSelection connectorName='addToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt} />
          : <div className='big-card shadow pure-u-1 d-flex flex-column'>
            <div className='pure-u-1 d-flex flex-row flex-h-between flex-wrap'>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenName setValid={this.setValidName} />
              </div>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenDecimals setValid={this.setValidDecimals} />
              </div>
            </div>
            <div className='pure-u-1 d-flex flex-row flex-h-between flex-wrap'>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSymbol setValid={this.setValidSymbol} />
              </div>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSupply setValid={this.setValidSupply} />
              </div>
            </div>
            <div className='pure-u-1 d-flex flex-row flex-h-between flex-v-end flex-wrap'>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenType />
              </div>
              <div className='deploy-container pure-u-1 pure-u-md-12-24'>
                {this.isValid() ? <button className='deploy pure-u-1 font-weight-bold' onClick={this.goToWalletSelection} >{t('Select the wallet')}</button> : null}
              </div>
            </div>
          </div>
        }
      </div>)
  }
}

export default withRouter(connect(s => s)(AddTokenAdvanced))
