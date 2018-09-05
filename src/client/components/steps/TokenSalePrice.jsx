import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPrice } from '../../redux/addTokenSale'
import icon from '../../assets/images/token-name.svg'
import './Step.css'
import './StepSingleInput.css'
import './StepDropdown.css'
import { translate } from 'react-i18next'

class TokenSalePrice extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }
  onChangeText = (e) => {
    const value = e.target.value

    const { dispatch, tokenId } = this.props
    dispatch(setPrice({ tokenAddress: tokenId, price: value }))
    this.setState({
      valid: this.validate(value)
    })
  }

  validate = (input) => {
    const { setValid } = this.props
    const valid = input.length > 1

    if (setValid) {
      setValid(valid)
    }
    return valid
  }
  componentWillMount () {
    const { addTokenSale, tokenId } = this.props
    this.setState({ valid: this.validate(addTokenSale[tokenId].price) })
  }

  render () {
    const { addTokenSale, nextFunction, t, tokenId } = this.props
    const { valid } = this.state
    const price = addTokenSale[tokenId].price

    return (
      <div className={`step ${nextFunction ? 'alone' : ''} pure-u-1 d-flex flex-column flex-h-between`}>
        <div className='top d-flex flex-row flex-h-start flex-v-center'>
          <div className='left'>
            <img className='icon' src={icon} alt='Icon' />
          </div>
          <div className='right d-flex flex-column flex-h-center'>
            <span className='title'>{t(`Insert the price for one token`)}:</span>
            <span className='description font-size-tiny'>{t(`Each token sale can have different price. Here you must set the current price of this token sale smart contract. The price must be in ETH.`)}</span>
          </div>
        </div>
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className={`input-box dropdown ${nextFunction ? 'pure-u-16-24' : 'pure-u-1'} d-flex flex-column flex-v-center`}>
            <div className='pure-u-1 d-flex flex-row'>
              <input placeholder={t(`Insert the price`)} className='token-name text shadow pure-u-1' value={price} onChange={this.onChangeText} />
              <select>
                <option value='ethereum'>ETHEREUM</option>
                <option value='dollar'>DOLLAR</option>
              </select>
            </div>
            {!valid && price.length > 1 ? <div className='tooltip font-size-tiny pure-u-1 d-flex flex-row flex-v-center'><div className='triangle' />{t(`The price must be longer than 1 characters`)}</div> : null}
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
