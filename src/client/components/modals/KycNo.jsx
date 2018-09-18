import React from 'react'
import Modal from '../Modal'
import { translate } from 'react-i18next'

const KycNo = ({ t, toggleVisibility }) => {
  return (
    <Modal title={t('Without KYC')} visible toggleVisibility={toggleVisibility}>
      Without KYC
    </Modal>
  )
}

export default translate('translations')((KycNo))
