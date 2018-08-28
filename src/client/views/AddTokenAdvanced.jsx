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
import { preferences } from '../redux/preferences'

class AddTokenAdvanced extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,

      validName: false,
      validSymbol: false,
      validDecimals: false,
      validSupply: false
    }
  }

  goToWalletSelection = () => {
    const { dispatch } = this.props
    dispatch(setStep(6))
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
  render () {
    const { addToken, preferences } = this.props

    if (!preferences.terms) {
      return <TermsAndConditions />
    }
    return (<div>
      <div>
        <a href='/token/add/wizard'>wizard</a>
      </div>
      <h1>AddTokenAdvanced</h1>
      {addToken.step === 6 ? <WalletSelection />
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
