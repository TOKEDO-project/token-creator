import React from 'react'
import { translate } from 'react-i18next'
import './Pages.css'
import '../components/modals/KycYesNo.css'
class KYCpage extends React.Component {
  render () {
    const { t } = this.props
    return (
      <div className='kycPage step pure-u-1 d-flex flex-column flex-v-center pages'>
        <div className='box shadow pure-u-1 pure-u-sm-1 pure-u-md-1 pure-u-lg-22-24 pure-xl-15-24'>
          <h4 className='centerTxt'>{t('KYC Service')}</h4>
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
          <p>{t('While 50% of the estimated token sale buyers are to pay upfront, any money that will not be used for KYC will be returned to you. Each user will be assigned a tier, and then verified according to the requirements of that tier. The tier is determined by the threshold* the user falls in, depending on the amount sent to your token sale. The more it is, the higher the tier.')}</p>
          <p><span>{t('Tier 1, 2 and 3')}</span><br />{t('KYC cost: $3 per user.')}</p>
          <p><span>{t('Tier 4')}</span><br />{t('KYC cost: $45 per user.')}</p>
          <p>{t('The KYC Service is provided by ')}<a href='https://trustlesslabs.com/' target='_blank'>{t('Trustless Labs Ltd.')}</a></p>
          <p className='note'>*{t('These thresholds can be customized depending on the specific needs of your token sale (e.g. the legal framework of your country).')}</p>

          <div className='marginTop'>
            <h3 className='textCenter'><span>{t('Leave your contact information to find out more about our KYC service.')}</span></h3>

            <form className='kycForm bottom d-flex flex-row flex-h-between'>

              <div className='input-box pure-u-1 d-flex flex-column flex-v-center'>
                <input type='text' name='email' hidden /> <br />
                <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                  <label>{t('Email')}</label><br />
                  <input className=' text shadow pure-u-1' type='text' name='email2' />
                </div>

                <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                  <label>{t('Name')}</label><br />
                  <input className=' text shadow pure-u-1' type='text' name='name' />
                </div>
                <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                  <label>{t('Message')}</label><br />
                  <input className=' text shadow pure-u-1' type='text' name='message' />
                </div>
                <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                  <button className='nextBtn shadow pure-u-1' >{t('Send Form')}</button>
                </div>

                <div className='pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                  <p className='formMsg' />
                </div>

              </div>
            </form>

          </div>
        </div>
        <ScrollButton scrollStepInPx='50' delayInMs='16.66' />
      </div>
    )
  }
}

class ScrollButton extends React.Component {
  constructor () {
    super()

    this.state = {
      intervalId: 0
    }
  }

  scrollStep () {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId)
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
  }

  scrollToTop () {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs)
    this.setState({ intervalId: intervalId })
  }

  render () {
    return <button title='Back to top' className='scroll shadow'
      onClick={() => { this.scrollToTop() }}>
      <span className='fa fa-chevron-up' />
    </button>
  }
}

export default translate('translations')(KYCpage)
