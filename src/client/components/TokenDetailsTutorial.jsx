import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { setState } from '../redux/addMainTokenSale'
import './TokenDetailsTutorial.css'

class TokenDetailsTutorial extends React.Component {
  addTokenSale = () => {
    const { dispatch, tokenId, addMainTokenSale } = this.props
    if (!addMainTokenSale[tokenId] || addMainTokenSale[tokenId].state === 'uninitialized') {
      dispatch(setState({ state: 'initialized', tokenAddress: tokenId }))
    }
    if (addMainTokenSale[tokenId] && addMainTokenSale[tokenId].state === 'authorized') {
      console.log('CREAZIONE FIGLIA')
    }
  }

  render () {
    const { t } = this.props
    return (
      <div id='TokenDetailsTutorial' className='pure-u-1'>
        <div className='videoContent shadow'>
          <iframe width='100%' height='315' src='https://www.youtube.com/embed/cqZhNzZoMh8' frameBorder='0' allow='autoplay; encrypted-media' allowFullScreen />
        </div>
        <div className='d-flex flex-v-center flex-h-center'>

          <button onClick={this.addTokenSale}>{t('Add Token Sale')}</button>
        </div>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenDetailsTutorial))
