import React from 'react'
import Modal from '../Modal'
import { translate } from 'react-i18next'
import icon from '../../assets/images/back.svg'

const SwitchNetwork = ({ t }) => {
  return (
    <Modal icon={icon} title={t('Change network')} visible>
      {process.env.NET === 'ropsten'
        ? <div className='pure-u-1'>
          {t('You are on ropsten network, if you want to test this application ')}
          <a className='link' href='https://creator-test.tokedo.io' target='_blank'>{t('Click here')}</a> {t(' or switch the network')}
        </div>
        : <div className='pure-u-1'>
          {t('You are on mainnet network, if you want to use this application in production ')}
          <a className='link' href='https://creator.tokedo.io' target='_blank'>{t('Click here')}</a> {t(' or switch the network')}
        </div>
      }
    </Modal>
  )
}

export default translate('translations')((SwitchNetwork))
