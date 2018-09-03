import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { setState } from '../redux/addMainTokenSale'
import './TokenDetailsTutorial.css'

class TokenDetailsTutorial extends React.Component {
  addTokenSale = () => {
    const { dispatch, tokenId, addMainTokenSale } = this.props
    if (addMainTokenSale[tokenId].state === 'uninitialized') {
      dispatch(setState({ state: 'initialized', tokenAddress: tokenId }))
    }
    if (addMainTokenSale[tokenId].state === 'authorized') {
      console.log('CREAZIONE FIGLIA')
    }
  }

  render () {
    const { t } = this.props
    return (
      <div id='TokenDetailsTutorial'>
        <div className='videoContent'>
          <iframe width='560' height='315' src='https://www.youtube.com/embed/cqZhNzZoMh8' frameBorder='0' allow='autoplay; encrypted-media' allowFullScreen />
        </div>
        <div>
          <button onClick={this.addTokenSale}>{t('Add Token Sale')}</button>
        </div>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenDetailsTutorial))
