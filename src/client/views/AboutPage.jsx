import React from 'react'
import { translate } from 'react-i18next'

const AboutPage = ({ t }) => {
  return (
    <div>{t('AboutPage')}</div>
  )
}

export default translate('translations')(AboutPage)
