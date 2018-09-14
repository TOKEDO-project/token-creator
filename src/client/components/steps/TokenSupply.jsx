import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSupply } from '../../redux/addToken'
import icon from '../../assets/images/token-supply.svg'
import './Step.css'
import './StepSingleInput.css'
import { translate } from 'react-i18next'
import bnUtils from '../../../../bnUtils'
import { StepHeader } from './parts/StepHeader'

class TokenSupply extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  onChangeText = (e) => {
    const value = e.target.value

    const { dispatch } = this.props
    dispatch(setSupply(value))
    this.setState({
      valid: this.validate(value)
    })
  }

  validate = (input) => {
    const { setValid, addToken: { decimals } } = this.props
    const reg = /^-?\d*\.?\d*$/
    const amountDecimalArr = input.split('.')
    const amountDecimal = (amountDecimalArr[1]) ? amountDecimalArr[1].length : 0
    const decimalAllowed = decimals || 18
    const valid = input.length > 0 && bnUtils.gt(input, 0) && reg.test(input) && amountDecimal <= decimalAllowed
    if (setValid) { setValid(valid) }
    return valid
  }

  componentWillMount () {
    const { addToken } = this.props
    this.setState({ valid: this.validate(addToken.supply) })
  }

  render () {
    const { addToken, nextFunction, t } = this.props
    const { valid } = this.state
    const decimalAllowed = addToken.decimals || 18
    const errorMessage = t(`The numbers after the decimal separator can’t exceed`) + ' ' + decimalAllowed + t(` digits. The decimal separator has to be a dot.`)
    return (
      <div className={`step ${nextFunction ? 'alone' : ''} pure-u-1 d-flex flex-column flex-h-between`}>
        <StepHeader
          icon={icon}
          title={t(`Total supply`)}
        >
          {t(`The total supply is the total amount of tokens you are issuing. You will not be able to change this setting at a later time. Choose wisely.`)}
        </StepHeader>
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className={`input-box ${nextFunction ? 'pure-u-16-24' : 'pure-u-1'} d-flex flex-column flex-v-center`}>
            <input placeholder={t(`Insert total supply`)} className='token-supply text shadow pure-u-1' value={addToken.supply} onChange={this.onChangeText} />
            {!valid ? <div className='tooltip font-size-tiny pure-u-1 d-flex flex-row flex-v-center'><div className='triangle' />{errorMessage}</div> : null}
          </div>
          {nextFunction ? <button className='next shadow pure-u-7-24' disabled={!valid} onClick={nextFunction} >
          Next
          </button> : null}
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSupply))
