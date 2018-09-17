import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setKYC } from '../../redux/addTokenSale'
import icon from '../../assets/images/token-sale-kyc-yes.svg'
import './Step.css'
import './StepRadioButtons.css'
import './TokenType.css'
import { translate } from 'react-i18next'
import { StepHeader } from './parts/StepHeader'
import { Link } from 'react-router-dom'

class TokenSaleKyc extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: true
    }
  }

  onChange = (e) => {
    const { dispatch, tokenId } = this.props
    dispatch(setKYC({ tokenAddress: tokenId, kyc: e.target.value }))
  }

  render () {
    const { addTokenSale, nextFunction, t, tokenId } = this.props
    const { valid } = this.state
    const kyc = addTokenSale[tokenId].kyc
    const types = ['kyc-yes', 'kyc-no']
    return (
      <div id='token-type' className='step-container pure-u-1'>
        <div className={`step ${nextFunction ? 'alone' : ''} pure-u-1 d-flex flex-column flex-h-between`}>
          <StepHeader
            icon={icon}
            title={t(`KYC`)}
          >
            {t(`You can add our KYC system to this token sale. Read more `)} <Link to={{ pathname: '/faq', hash: '#Unlock' }} target='_blank'>{t(`here`)}</Link>
          </StepHeader>
          <form className='bottom d-flex flex-row flex-h-between flex-wrap'>
            {types.map((type, index) => {
              const KYCValue = type === 'kyc-yes'
              const kycActive = (type === 'kyc-yes' && kyc === 'true') || (type === 'kyc-no' && kyc === 'false')
              return <button key={index} value={KYCValue} onClick={this.onChange} type='button' className={`radio-box ${kycActive ? 'active' : ''} shadow pure-u-1 pure-u-sm-11-24 d-flex flex-row flex-h-center flex-v-center`}>
                {type === 'kyc-yes' ? <p>{t('YES')} <br />{ t('add KYC')}</p> : null}
                {type === 'kyc-no' ? <p>{t('NO')} <br />{ t(' proceed without KYC')}</p> : null}
                <div className={`radio-button ${kycActive ? 'active' : ''} d-flex flex-row flex-h-center flex-v-center`}>
                  <div className='radio-button-dot' />
                </div>
              </button>
            }
            )}
          </form>
        </div>
        {nextFunction ? <button className='deploy shadow pure-u-1' disabled={!valid} onClick={nextFunction} >{t('Deploy the Token Sale')}</button> : null}
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSaleKyc))
