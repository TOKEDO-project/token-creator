import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMinContribution } from '../../redux/addTokenSale'
import icon from '../../assets/images/token-sale-min-contribution.svg'
import './Step.css'
import './StepSingleInput.css'
import './StepDropdown.css'
import { translate } from 'react-i18next'
import bnUtils from '../../../../bnUtils'
import StepHeader from './parts/StepHeader'

class TokenSaleMinContribution extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }
  onChangeText = (e) => {
    const { dispatch, tokenId } = this.props
    let value = e.target.value

    dispatch(setMinContribution({ tokenAddress: tokenId, minContribution: value }))
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
    this.setState({ valid: this.validate(addTokenSale[tokenId].minContribution) })
  }

  render () {
    const { addTokenSale, nextFunction, t, tokenId } = this.props
    const { valid } = this.state
    const minContribution = addTokenSale[tokenId].minContribution
    const errorMessage = t(`Decimal must be separated by ' . ' and decimals lenght not more than 18`)
    return (
      <div className={`step ${nextFunction ? 'alone' : ''} pure-u-1 d-flex flex-column flex-h-between`}>
        <StepHeader
          icon={icon}
          title={t(`Minimum Contribution`)}
        >
          {t(`Specify the minimum amount of Ether that your buyers are required to send in order to participate.`)}
        </StepHeader>
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className={`input-box fake-dropdown ${nextFunction ? 'pure-u-16-24' : 'pure-u-1'} d-flex flex-column flex-v-center`}>
            <div className='pure-u-1 d-flex flex-row'>
              <input placeholder={t(`Insert minimum contribution`)} className='token-name text shadow pure-u-1' value={minContribution} onChange={this.onChangeText} />
              <div className='fake d-flex flex-row flex-h-center flex-v-center'>
                ETH
              </div>
            </div>
            {!valid && minContribution.length > 0 ? <div className='tooltip font-size-tiny pure-u-1 d-flex flex-row flex-v-center'><div className='triangle' />{errorMessage}</div> : null}
          </div>
          {nextFunction ? <button className='next shadow pure-u-7-24' disabled={!valid} onClick={nextFunction} >
            {t('Next')}
          </button> : null}
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSaleMinContribution))
