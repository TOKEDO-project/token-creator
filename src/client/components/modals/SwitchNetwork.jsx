import React from 'react'
import Modal from '../Modal'
import { translate } from 'react-i18next'

const SwitchNetwork = ({ t }) => {
  return (
    <Modal title={t('Change network')} visible>
      Switch to {process.env.NET}
    </Modal>
  )
}

export default translate('translations')((SwitchNetwork))
