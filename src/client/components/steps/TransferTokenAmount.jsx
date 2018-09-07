import React, { Component } from 'react'
import { connect } from 'react-redux'
import icon from '../../assets/images/token-sale-edit-amount.svg'
import './Step.css'
import './StepSingleInput.css'
import { translate } from 'react-i18next'
import { getTokenInfo } from '../../utils/tokens'
import bnUtils from '../../../../bnUtils'
import { StepHeader } from './parts/StepHeader'

class TransferTokenAmount extends Component {
  constructor (props) {
    super(props)

    this.state = {
      amount: '',
      valid: false
    }
  }

  onChangeText = (e) => {
    const { onChangeAmount, onValidAmount } = this.props
    const value = e.target.value
    const isValid = this.validate(value)
    this.setState({
      amount: value,
      valid: isValid
    })
    if (onChangeAmount) { onChangeAmount(value) }
    if (onValidAmount) { onValidAmount(isValid) }
  }

  validate = (input) => {
    const { tokenId, setValid, tokens, addMainTokenSale } = this.props
    const tokenInfo = getTokenInfo(tokenId, tokens)
    const reg = /^-?\d*\.?\d*$/
    const amountDecimalArr = input.split('.')
    const amountDecimal = (amountDecimalArr[1]) ? amountDecimalArr[1].length : 0
    const valid = input.length > 0 && bnUtils.lte(input, addMainTokenSale[tokenId].amount) && bnUtils.gt(input, 0) && reg.test(input) && amountDecimal <= tokenInfo.decimals
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
    const { t, hideNextButton, addMainTokenSale, tokenId, tokens } = this.props
    const { valid, amount } = this.state
    const tokenInfo = getTokenInfo(tokenId, tokens)
    const mainTokenSaleAmount = addMainTokenSale[tokenId].amount
    const errorMessage = t('Can not be more than') +
      ' ' + mainTokenSaleAmount + ' ' + t('tokens') +
      ' ' + t(`Decimal must be separated by ' . ' and decimals lenght not more than `) + ' ' + tokenInfo.decimals

    return (
      <div className='step pure-u-1 d-flex flex-column flex-h-between'>
        <StepHeader
          icon={icon}
          title={t(`Insert an amount of token to transfer`)}
        >
          {t(`Insert amount of token `)}
        </StepHeader>
        <form className='bottom d-flex flex-row flex-h-between' onSubmit={this.onSubmit}>
          <div className='input-box pure-u-16-24 d-flex flex-column flex-v-center'>
            <input placeholder={t(`Insert amount of token`)} className='token-name text shadow pure-u-1' value={amount} onChange={this.onChangeText} />
            {!valid ? <div className='tooltip font-size-tiny pure-u-1 d-flex flex-row flex-v-center'><div className='triangle' />{errorMessage}</div> : null}
          </div>
          {valid && !hideNextButton ? <button className='next shadow pure-u-7-24' onClick={this.onClickNext}>{t('Next')}</button> : null }
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TransferTokenAmount))
