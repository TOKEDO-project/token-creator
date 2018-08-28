import React, { Component } from 'react'
import { connect } from 'react-redux'

import TokenName from '../components/steps/TokenName'
import TokenSymbol from '../components/steps/TokenSymbol'
import TokenDecimals from '../components/steps/TokenDecimals'
import TokenSupply from '../components/steps/TokenSupply'
import TokenType from '../components/steps/TokenType'
import WalletSelection from '../components/steps/WalletSelection'

import { setStep } from '../redux/addToken'

class AddTokenWizard extends Component {
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

  deployToken = () => {
    const { dispatch } = this.props
    dispatch(setStep(6))
  }

  renderStep (step) {
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
        return <WalletSelection />
    }
  }

  render () {
    const { addToken: { step } } = this.props
    return (
      <div>
        <div>Step: {step}</div>
        {this.renderStep(step)}
        {step === 6 ? null : <div><a href='/token/add/advanced'>advanced</a></div> }
      </div>
    )
  }
}

export default connect(s => s)(AddTokenWizard)
