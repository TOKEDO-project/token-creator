import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

const TokenSaleListForToken = (props) => {
  const { t } = props
  return (
    <div className=''>
      <div>{t('List of token sale')}</div>
    </div>
  )
}

export default translate('translations')(connect(s => s)(TokenSaleListForToken))
