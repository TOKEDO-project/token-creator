import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import TokenDetailsTutorial from './TokenDetailsTutorial'
import AddTokenSaleWizard from './AddTokenSaleWizard'
import AddTokenSaleAdvanced from './AddTokenSaleAdvanced'

class TokenSaleListForToken extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      addTokenSaleFormType: 'wizard'
    }
  }
  onClickSetAdvanced = (e) => {
    e.preventDefault()
    this.setState({
      addTokenSaleFormType: 'advanced'
    })
  }
  onClickSetWizard = (e) => {
    e.preventDefault()
    this.setState({
      addTokenSaleFormType: 'wizard'
    })
  }
  render () {
    const { t, tokenId, tokenSales, mainTokenSaleAddress, addTokenSaleForm, addTokenSale } = this.props
    const { addTokenSaleFormType } = this.state
    const tokenSaleList = mainTokenSaleAddress && tokenSales[mainTokenSaleAddress] ? tokenSales[mainTokenSaleAddress] : []
    console.log('addTokenSale.step', addTokenSale.step)
    if (addTokenSaleForm) {
      return (
        <div>
          {addTokenSaleFormType === 'wizard'
            ? <div><AddTokenSaleWizard /> <div><a href='#' onClick={this.onClickSetAdvanced}>advanced</a></div></div>
            : <div><div><a href='#' onClick={this.onClickSetWizard}>wizard</a></div> <AddTokenSaleAdvanced /></div>}
        </div>
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
