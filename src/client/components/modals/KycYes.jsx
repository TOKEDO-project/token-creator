import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import axios from 'axios'
import qs from 'qs'
import Modal from '../Modal'
import { setTosAccepted } from '../../redux/addTokenSale'
import KYC from '../../assets/images/lock-KYC.svg'
import './KycYesNo.css'
import '../../views/Pages.css'

class KycYes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: true,
      checked: false,
      name: '',
      email2: '',
      message: '',
      status: ''
    }
  }

  onClick = (e) => {
    const { dispatch, tokenId, toggleVisibility } = this.props
    const { checked, status } = this.state
    e.preventDefault()
    if (checked && status === 'success') {
      dispatch(setTosAccepted({ tokenAddress: tokenId, tosAccepted: true }))
      toggleVisibility(e, true)
    }
  }

  onClickForm = async (e) => {
    const { email2, name, message } = this.state
    e.preventDefault()
    if (email2 !== '' && name !== '' && message !== '') {
      this.setState({
        status: ''
      })
      try {
        await axios.post('https://atomax.io/email/', qs.stringify({
          email: email2,
          name,
          msg: message
        }))
        this.setState({
          status: 'success'
        })
      } catch (e) {
        this.setState({
          status: 'error'
        })
      }
    } else {
      this.setState({
        status: 'missing'
      })
    }
  }

  toggleCheckbox = () => {
    this.setState({ checked: !this.state.checked })
  }

  onChangeText = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState({
      [name]: value
    })
  }

  render () {
    const { t, toggleVisibility, addTokenSale, tokenId } = this.props
    const { visible, checked, email2, name, message, status } = this.state
    const { tosAccepted } = addTokenSale[tokenId]
    return (
      <Modal title={t('KYC Service')} icon={KYC} visible={visible} toggleVisibility={toggleVisibility}>
        <div className='kycPage'>

          <div className='kycModal pure-u-1'>
            <p>{t('Token sales and companies alike are required to screen their buyers for AML (Anti Money Laundering).')}</p>
            <p>{t('The KYC (Know Your Customer) service we provide meets this need with an optimal solution. ')}</p>
            <p>{t('Our innovative system verifies the buyers without putting any obstacle in the way of their  participation in the token sale. Buyers can send ETH right away and participate instantly, but both the tokens and the funds are locked until the KYC is completed. This way you only pay for the users who have already made the choice to buy your tokens.')}</p>
            <p>{t('KYC with us is easy and cheap. The whole process is built in the Atomax Wallet and the buyers can easily purchase tokens and complete KYC verification, all within their wallet app.')}</p>
            <p>{t('We advise you to add KYC verification to your token sale for AML purposes.')}</p>
            <p>{t('Tokedo is not responsible for any legal consequence you might face for not performing KYC on your buyers.')}</p>

            <h3>{t('How it works')}</h3>
            <p>{t('Your token sale contracts work already and you can use them to sell your tokens. The completion of KYC is necessary to the release of the coins for both parts')}:</p>
            <ul className='numberList'>
              <li>1. {t('Buyers send their Ether to your token sale.')}</li>
              <li>2. {t('After sending his ETH, the buyer must verify his identity and upload the required documents through the Atomax Wallet app.')}</li>
              <li>3. {t('Once his identity has been verified, he can send the transaction that will unlock both his tokens and the funds he sent to the project.')}</li>
              <li>4. {t('You can use an admin panel to go through your buyers and check the buyers’ details.')}</li>
            </ul>

            <h3>{t('Prices and tiers')}</h3>
            <p>{t('While 50% of the estimated token sale buyers are to pay upfront, any money that will not be used for KYC will be returned to you. Each user will be assigned a tier, and then verified according to the requirements of that tier. The tier is determined by the threshold the user falls in, depending on the amount sent to your token sale. The more it is, the higher the tier.')}</p>
            <p><span>{t('Tier 1, 2 and 3')}</span><br />{t('KYC cost: $3 per user.')}</p>
            <p><span>{t('Tier 4')}</span><br />{t('KYC cost: $45 per user.')}</p>
            <p>{t('The KYC Service is provided by ')}<a href='https://trustlesslabs.com/'>{t('Trustless Labs Ltd.')}</a></p>
            <p className='note'>*{t('These thresholds can be customized depending on the specific needs of your token sale (e.g. the legal framework of your country).')}</p>
            <div>
              <h3>{t('How to apply')}</h3>
              <p>{t('To buy our KYC service and add KYC to your token sale')}:</p>
              <ul>
                <li>{t('Leave your contacts in the form below and accept the conditions.')}</li>
                <li>{t('You don’t need to make a payment now, you will be contacted to discuss your down payment and activate the service.')}</li>
                <li>{t('You can proceed with the design of your token sale.')}</li>
              </ul>
            </div>

            {!tosAccepted
              ? <form className='kycForm bottom d-flex flex-row flex-h-between' onSubmit={this.onClickForm}>
                <div className='input-box pure-u-1 d-flex flex-column flex-v-center'>
                  <input type='text' name='email' hidden /> <br />
                  <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                    <label>{t('Email')}</label>
                    <input className='token-name text shadow pure-u-1' type='text' name='email2' value={email2} onChange={this.onChangeText} />
                  </div>

                  <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                    <label>{t('Name')}</label>
                    <input className='token-name text shadow pure-u-1' type='text' name='name' value={name} onChange={this.onChangeText} />
                  </div>
                  <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                    <label>{t('Message')}</label>
                    <input className='token-name text shadow pure-u-1' type='text' name='message' value={message} onChange={this.onChangeText} />
                  </div>
                  <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3 d-flex flex-row flex-h-center flex-v-center'>
                    <input className='' type='checkbox' checked={checked} onChange={this.toggleCheckbox} value='terms' /><p>  {t('Accept Conditions')}</p>
                  </div>
                  <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                    <button className='nextBtn shadow pure-u-1' onClick={this.onClickForm}>{t('Send Form')}</button>
                  </div>

                  <div className='pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                    <p className='formMsg'>
                      {status === 'success' ? t('Email sent') : null}
                      {status === 'error' ? t('Error') : null}
                      {status === 'missing' ? t('Missing parameters') : null}
                    </p>
                  </div>

                  <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                    <button className='nextBtn  shadow pure-u-1' disabled={!checked || status !== 'success'} onClick={this.onClick}>{t('OK')}</button>
                  </div>
                </div>
              </form>
              : null
            }
          </div>
        </div>

      </Modal>
    )
  }
}

export default translate('translations')(connect(s => s)(KycYes))
