import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import TokenDetailsTutorial from './TokenDetailsTutorial'
import AddTokenSaleWizard from './AddTokenSaleWizard'
import AddTokenSaleAdvanced from './AddTokenSaleAdvanced'
import { reset } from '../redux/addTokenSale'
import { isEmpty, map } from 'lodash'

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
  componentDidMount () {
    const { dispatch, tokenId, addTokenSale } = this.props
    // const step = addTokenSale[tokenId].step
    if (!addTokenSale[tokenId]) {
      dispatch(reset({ tokenAddress: tokenId }))
    }
  }
  render () {
    const { tokenId, tokenSales, mainTokenSaleAddress, addTokenSaleForm, addTokenSale, t } = this.props
    const { addTokenSaleFormType } = this.state
    const tokenSaleReceipts = mainTokenSaleAddress && tokenSales[mainTokenSaleAddress] ? tokenSales[mainTokenSaleAddress].receipts : []
    const tokenSaleTransactions = mainTokenSaleAddress && tokenSales[mainTokenSaleAddress] ? tokenSales[mainTokenSaleAddress].transactions : []
    if (addTokenSaleForm && addTokenSale[tokenId]) {
      return (
        <div className='pure-u-1'>
          {addTokenSaleFormType === 'wizard'
            ? <AddTokenSaleWizard tokenId={tokenId} >
              <a className='advanced' href='#' onClick={this.onClickSetAdvanced}>{t('Advanced Mode (show all fields)')}</a>
            </AddTokenSaleWizard>
            : <div className='pure-u-1'>
              <a className='wizard' href='' onClick={this.onClickSetWizard}>{`< Back to wizard mode`}</a><AddTokenSaleAdvanced tokenId={tokenId} />
            </div>}
        </div>
      )
    }
    return (
      <div className='pure-u-1'>
        {
          isEmpty(tokenSaleReceipts)
            ? <TokenDetailsTutorial tokenId={tokenId} />
            : <div>
              {map(tokenSaleReceipts, (receipt, address) => {
                const tokenSale = tokenSaleTransactions[receipt.transactionHash]
                if (tokenSale.contractAddress) {
                  return (
                    <div key={address}>
                      <div>Amount: {tokenSale.amount}</div>
                      <div>Address: {tokenSale.contractAddress}</div>
                      <div>End Time: {tokenSale.endTime}</div>
                      <div>kyc: {tokenSale.kyc}</div>
                      <div>Min Contribution: {tokenSale.minContribution}</div>
                      <div>Owner: {tokenSale.owner}</div>
                      <div>Price: {tokenSale.price}</div>
                      <div>Start Time: {tokenSale.startTime}</div>
                      <br />
                    </div>
                  )
                }
              })}
            </div>
        }
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSaleListForToken))
