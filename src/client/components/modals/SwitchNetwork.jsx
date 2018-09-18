import React from 'react'
import Modal from '../Modal'
import { translate } from 'react-i18next'
import metamask from '../../assets/images/metamask.svg'
import './SwitchNetwork.css'

const SwitchNetwork = ({ t }) => {
  return (
    <Modal icon={metamask} title={t('Change network')} visible>
      {process.env.NET === 'ropsten'
        ? <div className='pure-u-1 network'>
          <p>
            {t('You are on ropsten network, if you want to test this application ')}
          </p>
          <p>
            <a className='link' href='https://creator-test.tokedo.io' target='_blank'>{t('Click here')}</a> {t(' or switch the network')}
          </p>
        </div>
        : <div className='pure-u-1 network'>
          <p>
            {t('You are on mainnet network, if you want to use this application in production.')}
          </p>
          <p>
            <a className='link' href='https://creator.tokedo.io' target='_blank'>{t('Click here')}</a> {t(' or switch the network')}
          </p>
        </div>
      }
    </Modal>
  )
}

export default translate('translations')((SwitchNetwork))
