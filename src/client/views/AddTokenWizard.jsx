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
import './AddTokenWizard.css'
import shuttle from '../assets/images/shuttle.svg'
import { translate } from 'react-i18next'

class AddTokenWizard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      transaction: '',
      contractAddress: ''
    }
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
    const { addToken, preferences, t } = this.props
    const {loading} = this.state
    if (!preferences.terms) {
      return <TermsAndConditions />
    }
    if (addToken.step === 6 && loading) {
      return <Loading />
    }
    return (
      <div id='token-wizard' className='pure-u-22-24 pure-u-sm-20-24 pure-md-18-24 d-flex flex-column flex-v-center'>
        <img className='shuttle' src={shuttle} alt='Shuttle' />
        <div className='progress-container pure-u-1 d-flex flex-column'>
          <div className={`progress-title pure-u-${addToken.step * 4}-24`}>Step {addToken.step}</div>
          <div className='progress-bar shadow'>
            <div className={`progress-bar-content pure-u-${addToken.step * 4}-24`} />
          </div>
        </div>
        <div className='content pure-u-1 d-flex flex-row flex-h-between'>
          {false ? <video className='pure-u-8-24' src='' /> : <div className='video-placeholder shadow pure-u-8-24 d-flex flex-row flex-h-center flex-v-center'><span className='fa fa-play-circle-o' /></div>}
          <div className='step-container pure-u-15-24 d-flex flex-column flex-v-center'>
            {this.renderStep(addToken.step)}
            {addToken.step === 6 ? null : <a className='advanced' href='/token/add/advanced'>{t('Advanced Mode (show all fields)')}</a> }
          </div>
        </div>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(AddTokenWizard))
