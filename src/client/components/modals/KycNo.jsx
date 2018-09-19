import React from 'react'
import Modal from '../Modal'
import { translate } from 'react-i18next'
import KYC from '../../assets/images/lock-KYC.svg'

const KycNo = ({ t, toggleVisibility }) => {
  return (
    <Modal title={t('Without KYC')} icon={KYC} visible toggleVisibility={toggleVisibility}>
      Without KYC
    </Modal>
  )
}

export default translate('translations')((KycNo))
