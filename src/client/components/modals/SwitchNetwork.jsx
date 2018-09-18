import React from 'react'
import Modal from '../Modal'
import { translate } from 'react-i18next'
import metamask from '../../assets/images/metamask.svg'
import './SwitchNetwork.css'

const SwitchNetwork = ({ t, metamaskNet }) => {
  return (
    <Modal icon={metamask} title={t('Oops! Something\'s wrong.')} visible>
      {metamaskNet === 'ropsten'
        ? <div className='pure-u-1 network'>
          <p>
            {t('Your Metamask wallet is currently operating in Ropsten Test Net.')}
          </p>
          <p>
            {t('If you want to keep using the Token Creator and generate your contracts please switch to the Main Ethereum Network.')}
          </p>
          <p>
            {t('If you want to run some tests instead, you can use our test environment at ')}
            <a className='link' href='https://creator-test.tokedo.io' target='_blank'>{t('creator-test.tokedo.io')}.</a>
          </p>
        </div>
        : <div className='pure-u-1 network'>
          <p>
            {t('Your Metamask wallet is currently operating in The Main Ethereum Network. This is the Tokedo Token Creator Test Environment.')}
          </p>

          <p>
            {t('If you want to run some tests you need to switch your wallet to the Ropsten Test Net.')}
          </p>
          <p>
            {t('If you want to use the Token Creator to generate your contracts instead, please visit ')}
            <a className='link' href='https://creator.tokedo.io' target='_blank'>{t('creator.tokedo.io')}.</a>
          </p>
        </div>
      }
    </Modal>
  )
}

export default translate('translations')((SwitchNetwork))
