import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import { setState } from '../redux/addMainTokenSale'
import './TokenDetailsTutorial.css'
import { YoutubeVideo } from './YoutubeVideo'

class TokenDetailsTutorial extends React.Component {
  addTokenSale = () => {
    const { history, dispatch, tokenId, addMainTokenSale } = this.props
    if (!addMainTokenSale[tokenId] || addMainTokenSale[tokenId].state === 'uninitialized') {
      dispatch(setState({ state: 'initialized', tokenAddress: tokenId }))
    }
    if (addMainTokenSale[tokenId] && addMainTokenSale[tokenId].state === 'authorized') {
      history.push(`/token/details/${tokenId}/add-token-sale`)
    }
  }

  render () {
    const { t } = this.props
    return (
      <div id='TokenDetailsTutorial' className='pure-u-1'>
        <YoutubeVideo id='cqZhNzZoMh8' shadow className='pure-u-1' />
        <div className='d-flex flex-v-center flex-h-center'>
          <button onClick={this.addTokenSale}>{t('Add Token Sale')}</button>
        </div>
      </div>
    )
  }
}

export default withRouter(translate('translations')(connect(s => s)(TokenDetailsTutorial)))
