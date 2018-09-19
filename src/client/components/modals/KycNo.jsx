import React from 'react'
import Modal from '../Modal'
import { translate } from 'react-i18next'
import KYC from '../../assets/images/lock-KYC.svg'
import './KycYesNo.css'

const KycNo = ({ t, toggleVisibility }) => {
  return (
    <Modal title={t('Without KYC')} icon={KYC} visible toggleVisibility={toggleVisibility}>
      <div className='pure-u-1 kycModal'>
        <p>
          {t('No KYC')}
        </p>
      </div>
    </Modal>
  )
}

export default translate('translations')((KycNo))
