import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import './TokenDetailsTutorial.css'

const TokenDetailsTutorial = (props) => {
  const { t } = props
  return (
    <div id='TokenDetailsTutorial'>
      <div className='videoContent'>
        <iframe width='560' height='315' src='https://www.youtube.com/embed/cqZhNzZoMh8' frameBorder='0' allow='autoplay; encrypted-media' allowFullScreen />
      </div>
      <div>
        <a href='/'><button>{t('Add Token Sale')}</button></a>
      </div>
    </div>
  )
}

export default translate('translations')(connect(s => s)(TokenDetailsTutorial))
