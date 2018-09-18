import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setKYC } from '../../redux/addTokenSale'
import KycYes from '../modals/KycYes'
import KycNo from '../modals/KycNo'
import icon from '../../assets/images/token-sale-kyc-yes.svg'
import './Step.css'
import './StepRadioButtons.css'
import './TokenType.css'
import { translate } from 'react-i18next'
import StepHeader from './parts/StepHeader'
import { Link } from 'react-router-dom'

class TokenSaleKyc extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showYesKycPopup: false,
      showNoKycPopup: false
    }
  }

  componentWillMount () {
    const { addTokenSale, tokenId } = this.props
    const { kyc, tosAccepted } = addTokenSale[tokenId]
    if (kyc === 'true' && !tosAccepted) {
      this.setState({showYesKycPopup: true})
    } else if (kyc === 'false') {
      this.setState({showNoKycPopup: true})
    }
  }

  onChange = (e, value) => {
    const { dispatch, tokenId } = this.props
    let showYesKycPopup = false
    let showNoKycPopup = false
    if (value === 'true') {
      showYesKycPopup = true
      showNoKycPopup = false
    } else if (value === 'false') {
      showYesKycPopup = false
      showNoKycPopup = true
    }
    this.setState({
      showYesKycPopup,
      showNoKycPopup
    })
    dispatch(setKYC({ tokenAddress: tokenId, kyc: value }))
  }

  toggleVisibilityNo = () => {
    this.setState({
      showNoKycPopup: false
    })
  }

  toggleVisibilityYes = (e, newTosAccepted) => {
    const { dispatch, tokenId, addTokenSale } = this.props
    const { tosAccepted } = addTokenSale[tokenId]
    this.setState({
      showYesKycPopup: false
    })
    if (!tosAccepted && !newTosAccepted) {
      dispatch(setKYC({ tokenAddress: tokenId, kyc: '' }))
    }
  }

  render () {
    const { addTokenSale, nextFunction, t, tokenId } = this.props
    const { showYesKycPopup, showNoKycPopup } = this.state
    const { kyc, tosAccepted } = addTokenSale[tokenId]
    const valid = kyc === 'false' || (kyc === 'true' && tosAccepted)
    return (
      <div id='token-type' className='step-container pure-u-1'>
        <div className={`step ${nextFunction ? 'alone' : ''} pure-u-1 d-flex flex-column flex-h-between`}>
          <StepHeader
            icon={icon}
            title={t(`KYC`)}
          >
            {t(`You can add our KYC system to this token sale. Read more `)} <Link to={{ pathname: '/help', hash: '#kycSection' }} target='_blank'>{t(`here`)}</Link>
          </StepHeader>
          {showYesKycPopup ? <KycYes tokenId={tokenId} toggleVisibility={(e, tosAccepted) => this.toggleVisibilityYes(e, tosAccepted)} /> : null}
          {showNoKycPopup ? <KycNo tokenId={tokenId} toggleVisibility={this.toggleVisibilityNo} /> : null}
          <form className='bottom d-flex flex-row flex-h-between flex-wrap'>
            <button onClick={(e) => this.onChange(e, 'true')} type='button' className={`radio-box ${kyc === 'true' ? 'active' : ''} shadow pure-u-1 pure-u-sm-11-24 d-flex flex-row flex-h-center flex-v-center`}>
              <p>{t('YES')} <br />{t('add KYC')}</p>
              <div className={`radio-button ${kyc === 'true' ? '' : ''} d-flex flex-row flex-h-center flex-v-center`}>
                <div className='radio-button-dot' />
              </div>
            </button>
            <button onClick={(e) => this.onChange(e, 'false')} type='button' className={`radio-box ${kyc === 'false' ? 'active' : ''} shadow pure-u-1 pure-u-sm-11-24 d-flex flex-row flex-h-center flex-v-center`}>
              <p>{t('NO')} <br />{t(' proceed without KYC')}</p>
              <div className={`radio-button ${kyc === 'false' ? '' : ''} d-flex flex-row flex-h-center flex-v-center`}>
                <div className='radio-button-dot' />
              </div>
            </button>
          </form>
        </div>
        {nextFunction ? <button className='deploy shadow pure-u-1' disabled={!valid} onClick={nextFunction} >{t('Deploy the Token Sale')}</button> : null}
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSaleKyc))
