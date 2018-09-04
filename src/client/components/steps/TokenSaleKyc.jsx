import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setKyc } from '../../redux/addTokenSale'
import icon from '../../assets/images/token-type.svg'
import './Step.css'
import './StepRadioButtons.css'
import './TokenType.css'
import { translate } from 'react-i18next'

class TokenSaleKyc extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: true
    }
  }

  onChange = (e) => {
    const { dispatch } = this.props
    dispatch(setKyc(e.target.value))
  }

  render () {
    const { addTokenSale, nextFunction, t } = this.props
    const { valid } = this.state
    const types = ['kyc-yes', 'kyc-no']
    return (
      <div id='token-type' className='pure-u-1'>
        <div className='step pure-u-1 d-flex flex-column flex-h-between'>
          <div className='top d-flex flex-row flex-h-start flex-v-center'>
            <div className='left'>
              <img className='icon' src={icon} alt='Icon' />
            </div>
            <div className='right d-flex flex-column flex-h-center'>
              <span className='title'>{t(`KYC`)}:</span>
              <span className='description font-size-tiny'>{t(`You can add our KYC system on this token sale.`)} <a href='' target='_blank'>{t(`Read more about`)}</a></span>
            </div>
          </div>
          <form className='bottom d-flex flex-row flex-h-between flex-wrap'>
            {types.map((type, index) =>
              <button key={index} value={type} onClick={this.onChange} type='button' className={`radio-box ${addTokenSale.kyc === type ? 'active' : ''} shadow pure-u-1 ${nextFunction ? 'pure-u-sm-7-24' : 'pure-u-lg-7-24'} d-flex flex-row flex-h-center flex-v-center`}>
                {type === 'kyc-yes' ? t('KYC yes') : null}
                {type === 'kyc-no' ? t('KYC no') : null}
                <div className={`radio-button ${addTokenSale.kyc === type ? 'active' : ''} d-flex flex-row flex-h-center flex-v-center`}>
                  <div className='radio-button-dot' />
                </div>
              </button>
            )}
          </form>
        </div>
        {nextFunction ? <button className='deploy shadow pure-u-1' disabled={!valid} onClick={nextFunction} >{t('Deploy the Token Sale')}</button> : null}
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSaleKyc))
