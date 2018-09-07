import React, { Component } from 'react'
import { connect } from 'react-redux'
import icon from '../../assets/images/token-sale-edit-amount.svg'
import './Step.css'
import './StepSingleInput.css'
import { translate } from 'react-i18next'
import { getTokenInfo } from '../../utils/tokens'
import bnUtils from '../../../../bnUtils'
import { StepHeader } from './parts/StepHeader'

class MainTokenSaleAddAmount extends Component {
  constructor (props) {
    super(props)
    this.state = {
      valid: false,
      tokenAddAmountInput: ''
    }
  }
  onClickNext = (e) => {
    e.preventDefault()
    console.log('tokenInfo', 'onClickNext')
    const {onIsValidCB} = this.props
    const {tokenAddAmountInput} = this.state
    const value = tokenAddAmountInput
    const isValid = this.validate(value)
    console.log('tokenAddAmountInput', tokenAddAmountInput)
    this.setState({ valid: isValid })
    if (onIsValidCB && isValid) { onIsValidCB(value) }
  }
  onChangeText = (e) => {
    const value = e.target.value
    const isValid = this.validate(value)
    this.setState({
      tokenAddAmountInput: value,
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
    const remainingTokens = (tokenInfo.supply - addMainTokenSale[tokenId].amount)
    const valid = input.length > 0 && bnUtils.lte(input, remainingTokens) && bnUtils.gt(input, 0) && reg.test(input) && amountDecimal <= tokenInfo.decimals
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
    const { valid, tokenAddAmountInput } = this.state
    console.log('tokenInfo', 'tokenAddAmount--', tokenAddAmountInput)
    const tokenInfo = getTokenInfo(tokenId, tokens)
    const mainTokenSaleAmount = addMainTokenSale[tokenId].amount
    const remainingTokens = (tokenInfo.supply - mainTokenSaleAmount)
    const errorMessage = t('Can not be more than') +
      ' ' + remainingTokens + ' ' + t('tokens') +
      ' ' + t(`Decimal must be separated by ' . ' and decimals lenght not more than `) + ' ' + tokenInfo.decimals
    return (
      <div className={`step ${nextFunction ? 'alone' : ''} pure-u-1 d-flex flex-column flex-h-between`}>
        <StepHeader
          icon={icon}
          title={t(`Insert amount of tokens to add`)}
        >
          {t(`The quantity of tokens you want to add.`)}
        </StepHeader>
        <form className='bottom d-flex flex-row flex-h-between' onSubmit={this.onSubmit}>
          <div className={`input-box ${nextFunction ? 'pure-u-16-24' : 'pure-u-1'} d-flex flex-column flex-v-center`}>
            <input placeholder={t(`Insert the amount`)} className='token-name text shadow pure-u-1' value={tokenAddAmountInput} onChange={this.onChangeText} />
            {!valid ? <div className='tooltip font-size-tiny pure-u-1 d-flex flex-row flex-v-center'><div className='triangle' />{errorMessage}</div> : null}
          </div>
          {valid ? <button className='next shadow pure-u-7-24' onClick={this.onClickNext}>{t('Next')}</button> : null }
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(MainTokenSaleAddAmount))
