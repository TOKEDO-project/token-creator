import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPrice, setPriceCurrency } from '../../redux/addTokenSale'
import icon from '../../assets/images/token-price.svg'
import './Step.css'
import './StepSingleInput.css'
import './StepDropdown.css'
import { translate } from 'react-i18next'
import bnUtils from '../../../../bnUtils'
import { StepHeader } from './parts/StepHeader'

class TokenSalePrice extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  onChangeText = (e) => {
    const { dispatch, tokenId } = this.props

    const value = e.target.value
    dispatch(setPrice({ tokenAddress: tokenId, price: value }))
    this.setState({
      valid: this.validate(value)
    })
  }

  validate = (input) => {
    const { setValid } = this.props
    const reg = /^-?\d*\.?\d*$/
    const amountDecimalArr = input.split('.')
    const amountDecimal = (amountDecimalArr[1]) ? amountDecimalArr[1].length : 0
    const valid = input.length > 0 && bnUtils.gt(input, 0) && reg.test(input) && amountDecimal <= 18
    if (setValid) { setValid(valid) }
    return valid
  }

  componentWillMount () {
    const { addTokenSale, tokenId } = this.props
    this.setState({ valid: this.validate(addTokenSale[tokenId].price) })
  }

  onChangePriceSelect = (e) => {
    const value = e.target.value
    const { dispatch, tokenId } = this.props
    dispatch(setPriceCurrency({ tokenAddress: tokenId, priceCurrency: value }))
  }

  render () {
    const { addTokenSale, nextFunction, t, tokenId } = this.props
    const { valid } = this.state
    const price = addTokenSale[tokenId].price
    const priceCurrency = addTokenSale[tokenId].priceCurrency
    const errorMessage = t(`Decimal must be separated by ' . ' and decimals lenght not more than 18`)
    return (
      <div className={`step ${nextFunction ? 'alone' : ''} pure-u-1 d-flex flex-column flex-h-between`}>
        <StepHeader
          icon={icon}
          title={t(`Insert the price for one token`)}
        >
          {t(`Each token sale can have different price. Here you must set the current price of this token sale smart contract. The price must be in ETH.`)}
        </StepHeader>
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className={`input-box dropdown ${nextFunction ? 'pure-u-16-24' : 'pure-u-1'} d-flex flex-column flex-v-center`}>
            <div className='pure-u-1 d-flex flex-row'>
              <input placeholder={t(`Insert the price`)} className='token-name text shadow pure-u-1' value={price} onChange={this.onChangeText} />
              <select value={priceCurrency} onChange={this.onChangePriceSelect}>
                <option value=''>ETH</option>
                <option value='usd'>USD</option>
              </select>
            </div>
            {!valid && price.length > 0 ? <div className='tooltip font-size-tiny pure-u-1 d-flex flex-row flex-v-center'><div className='triangle' />{errorMessage}</div> : null}
          </div>
          {nextFunction ? <button className='next shadow pure-u-7-24' disabled={!valid} onClick={nextFunction} >
            {t('Next')}
          </button> : null}
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSalePrice))
