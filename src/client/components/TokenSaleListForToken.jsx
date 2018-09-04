import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import TokenDetailsTutorial from './TokenDetailsTutorial'

class TokenSaleListForToken extends React.Component {
  render () {
    const { t, tokenId, tokenSales, mainTokenSaleAddress, addTokenSaleForm } = this.props
    const tokenSaleList = mainTokenSaleAddress && tokenSales[mainTokenSaleAddress] ? tokenSales[mainTokenSaleAddress] : []

    if (addTokenSaleForm) {
      return (
        <div>addTokenSaleForm...</div>
      )
    }
    return (
      <div className=''>
        <div>{tokenSaleList.length === 0 ? <TokenDetailsTutorial tokenId={tokenId} /> : <div>{t('List of token sale')}</div>}</div>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSaleListForToken))
