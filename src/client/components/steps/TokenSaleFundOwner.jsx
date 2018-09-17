import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setFundOwner } from '../../redux/addTokenSale'
import icon from '../../assets/images/token-sale-fund-owner.svg'
import './Step.css'
import './StepSingleInput.css'
import { translate } from 'react-i18next'
import StepHeader from './parts/StepHeader'

class TokenSaleFundOwner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  onChangeText = (e) => {
    const { dispatch, tokenId } = this.props

    const value = e.target.value.trim()
    dispatch(setFundOwner({tokenAddress: tokenId, owner: value}))
    this.setState({
      valid: this.validate(value)
    })
  }

  validate = (input) => {
    const { setValid, web3 } = this.props
    const valid = web3.utils.isAddress(input)

    if (setValid) {
      setValid(valid)
    }
    return valid
  }

  componentWillMount () {
    const { addTokenSale, tokenId } = this.props
    this.setState({ valid: this.validate(addTokenSale[tokenId].owner) })
  }

  render () {
    const { addTokenSale, nextFunction, t, tokenId } = this.props
    const { valid } = this.state
    const owner = addTokenSale[tokenId].owner

    return (
      <div className={`step ${nextFunction ? 'alone' : ''} pure-u-1 d-flex flex-column flex-h-between`}>
        <StepHeader
          icon={icon}
          title={t(`Insert the Fund Owner`)}
        >
          {t(`Set the Ethereum address where you want to recive the ETH of this token sale.`)}
        </StepHeader>
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className={`input-box ${nextFunction ? 'pure-u-16-24' : 'pure-u-1'} d-flex flex-column flex-v-center`}>
            <input placeholder={t(`Insert the fund owner`)} className='token-name text shadow pure-u-1' value={owner} onChange={this.onChangeText} />
            {!valid && owner.length > 0 ? <div className='tooltip font-size-tiny pure-u-1 d-flex flex-row flex-v-center'><div className='triangle' />{t(`Must be a valid Ethereum address`)}</div> : null}
          </div>
          {nextFunction ? <button className='next shadow pure-u-7-24' disabled={!valid} onClick={nextFunction} >
            {t('Next')}
          </button> : null}
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSaleFundOwner))
