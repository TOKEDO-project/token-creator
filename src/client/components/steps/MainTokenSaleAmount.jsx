import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { setAmount } from '../../redux/addMainTokenSale'
import { getTokenInfo } from '../../utils/tokens'
import bnUtils from '../../../../bnUtils'
import icon from '../../assets/images/token-supply.svg'
import './Step.css'
import './StepSingleInput.css'
import { StepHeader } from './parts/StepHeader'

class MainTokenSaleAmount extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  onClickNext = (e) => {
    e.preventDefault()
    const {onIsValidCB, addMainTokenSale, tokenId} = this.props
    const value = addMainTokenSale[tokenId].amount
    const isValid = this.validate(value)
    this.setState({ valid: isValid })
    if (onIsValidCB && isValid) { onIsValidCB(value) }
  }
  onChangeText = (e) => {
    const value = e.target.value
    console.log('VALID', 'onChangeText')
    const { dispatch, tokenId } = this.props
    dispatch(setAmount({tokenAddress: tokenId, amount: value}))
    const isValid = this.validate(value)
    this.setState({ valid: isValid })
    // const {onIsValidCB} = this.props
    // if (onIsValidCB) { onIsValidCB(value, isValid) }
  }

  validate = (input) => {
    const { setValid, tokenId, tokens } = this.props
    const tokenInfo = getTokenInfo(tokenId, tokens)
    // input = input.replace(',', '.')
    const reg = /^-?\d*\.?\d*$/
    let valid = input.length > 0 && bnUtils.lte(input, tokenInfo.supply) && bnUtils.gt(input, 0) && reg.test(input)
    // Questo serve solo nell'advance poerche noi vogliamo fare la validazione sul pulsante mentre questo qui è una validazione interna
    if (setValid) {
      setValid(valid)
    }
    return valid
  }

  componentWillMount () {
    const { addMainTokenSale, tokenId } = this.props
    const value = addMainTokenSale[tokenId].amount
    const isValid = this.validate(value)
    this.setState({ valid: isValid })
    // const {onIsValidCB} = this.props
    // if (onIsValidCB) { onIsValidCB(value, isValid) }
  }

  render () {
    const { addMainTokenSale, t, tokenId } = this.props
    const { valid } = this.state

    return (
      <div className='step alone pure-u-1'>
        <StepHeader
          icon={icon}
          title={t(`Token supply of the Project `)}
        >
          {t(`Specify the total amount of tokens you intend to allocate for sale. This includes all the token sale contracts you will eventually create. You will be able to change this quantity at a later time.`)}
        </StepHeader>
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className='input-box pure-u-16-24 d-flex flex-column flex-v-center'>
            <input type='text' placeholder={t(`Insert amount`)} className='token-supply text shadow pure-u-1' value={addMainTokenSale[tokenId].amount} onChange={this.onChangeText} />
            {!valid ? <div className='tooltip d-flex flex-row flex-v-center'><div className='triangle' />
              {t(`Amount must be less than or equal to the total supply and it must be only a number. The decimal separator is a dot.`)}</div> : null}
          </div>
          {valid ? <button className='next shadow pure-u-7-24' onClick={this.onClickNext}>{t('Next')}</button> : null }
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(MainTokenSaleAmount))
