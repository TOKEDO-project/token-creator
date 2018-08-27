import React, { Component } from 'react'
import TokenName from '../components/steps/TokenName'
import TokenSymbol from '../components/steps/TokenSymbol'
import TokenDecimals from '../components/steps/TokenDecimals'
import TokenSupply from '../components/steps/TokenSupply'
import TokenType from '../components/steps/TokenType'
import WalletSelection from '../components/steps/WalletSelection'

class AddTokenWizard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 1
    }
  }

  goToStep2 = () => {
    this.setState({
      step: 2
    })
  }

  goToStep3 = () => {
    this.setState({
      step: 3
    })
  }

  goToStep4 = () => {
    this.setState({
      step: 4
    })
  }

  goToStep5 = () => {
    this.setState({
      step: 5
    })
  }

  deployToken = () => {
    this.setState({
      step: 6
    })
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
    const { step } = this.state
    return (
      <div>
        <div>Step: {step}</div>
        {this.renderStep(step)}

        <div>
          <a href='/token/add/advanced'>advanced</a>
        </div>
      </div>
    )
  }
}

export default AddTokenWizard
