import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setDecimals, setSupply } from '../../redux/addToken'
import icon from '../../assets/images/token-decimals.svg'
import './Step.css'
import './StepSingleInput.css'
import { translate } from 'react-i18next'
import { StepHeader } from './parts/StepHeader'

class TokenDecimals extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  onChangeText = (e) => {
    const value = e.target.value
    const { dispatch } = this.props

    dispatch(setDecimals(value))
    this.setState({
      valid: this.validate(value)
    })
  }

  validate = (input) => {
    const { setValid, addToken: { supply }, dispatch } = this.props
    const reg = /^\d+$/
    const valid = input >= 0 && input <= 18 && reg.test(input)

    const amountDecimalArr = supply.split('.')
    const amountDecimal = (amountDecimalArr[1]) ? amountDecimalArr[1].length : 0
    if (valid && amountDecimal > input) {
      const newSupply = amountDecimalArr[0] + '.' + amountDecimalArr[1].slice(0, amountDecimal - input)
      dispatch(setSupply(newSupply))
    }

    if (setValid) {
      setValid(valid)
    }
    return valid
  }

  componentWillMount () {
    const { addToken } = this.props
    this.setState({ valid: this.validate(addToken.decimals) })
  }

  render () {
    const { addToken, nextFunction, t } = this.props
    const { valid } = this.state

    return (
      <div className={`step ${nextFunction ? 'alone' : ''} pure-u-1 d-flex flex-column flex-h-between`}>
        <StepHeader
          icon={icon}
          title={t(`Insert the decimals of your token`)}
        >
          {t(`You can choose the decimal after the 0. Max length is 18.`)}<br />{t(`Ethereum has 18 decimals and bitcoin has only 8.`)}
        </StepHeader>
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className={`input-box ${nextFunction ? 'pure-u-16-24' : 'pure-u-1'} d-flex flex-column flex-v-center`}>
            <input placeholder={t(`Insert the decimals`)} className='token-decimals text shadow pure-u-1' value={addToken.decimals} onChange={this.onChangeText} />
            {!valid && addToken.decimals.length > 0 ? <div className='tooltip font-size-tiny pure-u-1 d-flex flex-row flex-v-center'><div className='triangle' />{t(`The decimals number must be between 0 and 18`)}</div> : null}
          </div>
          {nextFunction ? <button className='next shadow pure-u-7-24' disabled={!valid} onClick={nextFunction} >
          Next
          </button> : null}
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenDecimals))
