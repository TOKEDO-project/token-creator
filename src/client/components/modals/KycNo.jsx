import React from 'react'
import Modal from '../Modal'
import { translate } from 'react-i18next'
import KYC from '../../assets/images/lock-KYC.svg'
import './KycYesNo.css'

const KycNo = ({ t, toggleVisibility }) => {
  return (
    <Modal title={t('KYC Service')} icon={KYC} visible toggleVisibility={toggleVisibility}>
      <div id='kycNo' className='kycPage'>

        <div className='kycModal pure-u-1'>

          <p><span>{t('You are having a token sale with no KYC (Know Your Customer).')}</span></p>
          <p>{t('Token sales and companies alike are required to screen their buyers for AML (Anti Money Laundering).')}</p>
          <p>{t('We advise you to add KYC verification to your token sale for AML purposes.')}</p>
          <p>{t('Tokedo is not responsible for any legal consequence you might face for not performing KYC on your buyers.')}</p>
          <div className='d-flex flex-row pure-u-1 flex-h-center flex-v-center marginTop'>
            <button onClick={toggleVisibility} className='marginTop nextBtn shadow pure-u-1 pure-u-sm-1 pure-u-md-1-3 pure-u-lg-1-3 pure-u-xl-1-4'>{t('I acknowledge this and I want to proceed anyway')}</button>
          </div>

        </div>
      </div>
    </Modal>
  )
}

export default translate('translations')((KycNo))
