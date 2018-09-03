import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import TokenDetailsTutorial from './TokenDetailsTutorial'

class TokenSaleListForToken extends React.Component {
  render () {
    const { t, tokenId, mainTokenSales, tokenSales } = this.props
    const mainTokenSale = mainTokenSales[tokenId]
    const mainTokenSaleAddress = mainTokenSale && mainTokenSale.receipt ? mainTokenSale.receipt.contractAddress : null
    const tokenSaleList = mainTokenSaleAddress && tokenSales[mainTokenSaleAddress] ? tokenSales[mainTokenSaleAddress] : []

    return (
      <div className=''>
        <div>{tokenSaleList.length === 0 ? <TokenDetailsTutorial tokenId={tokenId} /> : <div>{t('List of token sale')}</div>}</div>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSaleListForToken))
