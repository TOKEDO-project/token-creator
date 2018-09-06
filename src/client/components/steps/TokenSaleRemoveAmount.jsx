import React, { Component } from 'react'
import { connect } from 'react-redux'
import icon from '../../assets/images/token-sale-amount.svg'
import './Step.css'
import './StepSingleInput.css'
import { translate } from 'react-i18next'
import { getTokenInfo } from '../../utils/tokens'
import bnUtils from '../../../../bnUtils'

class TokenSaleRemoveAmount extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false,
      tokenRemoveAmountInput: ''
    }
  }
  onClickNext = (e) => {
    e.preventDefault()
    console.log('tokenInfo', 'onClickNext')
    const {onIsValidCB} = this.props
    const {tokenRemoveAmountInput} = this.state
    const value = tokenRemoveAmountInput
    const isValid = this.validate(value)
    console.log('tokenRemoveAmountInput', tokenRemoveAmountInput)
    this.setState({ valid: isValid })
    if (onIsValidCB && isValid) { onIsValidCB(value) }
  }
  onChangeText = (e) => {
    const value = e.target.value
    const isValid = this.validate(value)
    this.setState({
      tokenRemoveAmountInput: value,
      valid: isValid
    })
  }

  validate = (input) => {
    const { tokenId, setValid, tokens, addMainTokenSale } = this.props
    const tokenInfo = getTokenInfo(tokenId, tokens)
    // input = input.replace(',', '.')
    const reg = /^-?\d*\.?\d*$/
    const amountDecimalArr = input.split('.')
    const amountDecimal = (amountDecimalArr[1]) ? amountDecimalArr[1].length : 0
    console.log('tokenInfo', 'amountDecimal', amountDecimalArr, 'amountDecimal', amountDecimal)
    const valid = input.length > 0 && bnUtils.lte(input, addMainTokenSale[tokenId].amount) && bnUtils.gt(input, 0) && reg.test(input) && amountDecimal <= tokenInfo.decimals
    // this.setState({ errorMessage: t('') })
    if (setValid) { setValid(valid) }
    return valid
  }
  componentWillMount () {
    /* Needs the real pointer to this variable
    const { addToken } = this.props
    this.setState({ valid: this.validate(addToken.name) }) */
  }
  onSubmit = (e) => {
    e.preventDefault()
    const { valid } = this.state
    if (valid) {
      this.onClickNext()
    }
  }
  render () {
    const { tokenId, nextFunction, t, tokens, addMainTokenSale } = this.props
    const { valid, tokenRemoveAmountInput } = this.state
    const tokenInfo = getTokenInfo(tokenId, tokens)
    const errorMessage = t('Can not be more than') +
      ' ' + addMainTokenSale[tokenId].amount + ' ' + t('tokens') +
      ' ' + t(`Decimal must be separated by ' . ' and decimals lenght not more than `) + ' ' + tokenInfo.decimals
    return (
      <div className={`step ${nextFunction ? 'alone' : ''} pure-u-1 d-flex flex-column flex-h-between`}>
        <div className='top d-flex flex-row flex-h-start flex-v-center'>
          <div className='left'>
            <img className='icon' src={icon} alt='Icon' />
          </div>
          <div className='right d-flex flex-column flex-h-center'>
            <span className='title'>{t(`Insert an amount of token to remove`)}:</span>
            <span className='description font-size-tiny'>{t(`Insert the amount of token`)}</span>
          </div>
        </div>
        <form className='bottom d-flex flex-row flex-h-between' onSubmit={this.onSubmit}>
          <div className={`input-box ${nextFunction ? 'pure-u-16-24' : 'pure-u-1'} d-flex flex-column flex-v-center`}>
            <input placeholder={t(`Insert Amount of Token`)} className='token-name text shadow pure-u-1' value={tokenRemoveAmountInput} onChange={this.onChangeText} />
            {!valid ? <div className='tooltip font-size-tiny pure-u-1 d-flex flex-row flex-v-center'><div className='triangle' />{ errorMessage }</div> : null}
          </div>
          {valid ? <button className='next shadow pure-u-7-24' onClick={this.onClickNext}>{t('Next')}</button> : null }
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSaleRemoveAmount))
