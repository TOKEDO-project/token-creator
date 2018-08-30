import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

const TokenDetailsTutorial = (props) => {
  const { t } = props
  return (
    <div className=''>
      <div>video...</div>
      <div>
        <a href='/'><button>{t('Add Token Sale')}</button></a>
      </div>
    </div>
  )
}

export default translate('translations')(connect(s => s)(TokenDetailsTutorial))
