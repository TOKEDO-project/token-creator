import React from 'react'
import Modal from '../Modal'
import { translate } from 'react-i18next'

const KycYes = ({ t, toggleVisibility }) => {
  return (
    <Modal title={t('With KYC')} visible toggleVisibility={toggleVisibility}>
      With KYC
    </Modal>
  )
}

export default translate('translations')((KycYes))
