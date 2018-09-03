import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import './TokenDetails.css'
import PageNotFound from '../components/PageNotFound'
import TokenDetailsTutorial from '../components/TokenDetailsTutorial'
import TokenSaleListForToken from '../components/TokenSaleListForToken'
import MainTokenSaleDetail from '../components/MainTokenSaleDetail'
import MainTokenSaleInit from '../components/MainTokenSaleInit'
import MainTokenSaleAddToken from '../components/MainTokenSaleAddToken'
import MainTokenSaleAuthorize from '../components/MainTokenSaleAuthorize'
import TokenDetailsTopBar from '../components/TokenDetailsTopBar'
import TokenDetailsMenu from '../components/TokenDetailsMenu'

class TokenDetails extends React.Component {
  render () {
    const { match: { params: { tokenId } }, tokens: { transactions, receipts } } = this.props

    // Get token receipt
    const receipt = receipts[tokenId]

    if (!receipt) {
      return (
        <PageNotFound />
      )
    }

    // Get token details
    const tokenDetails = transactions[receipt.transactionHash]
    const { tokenSales, mainTokenSales, addMainTokenSale } = this.props

    console.log('receipt', receipt, 'tokenDetails', tokenDetails)
    const mainTokenSale = mainTokenSales[tokenId]
    const mainTokenSaleAddress = mainTokenSale && mainTokenSale.receipt ? mainTokenSale.receipt.contractAddress : null
    const tokenSaleList = mainTokenSaleAddress && tokenSales[mainTokenSaleAddress] ? tokenSales[mainTokenSaleAddress] : []

    return (
      <div className='pure-u-1'>
        <div id='TokenDetails'>
          <TokenDetailsTopBar tokenDetails={tokenDetails} tokenId={tokenId} receipt={receipt} />
          <div className='TokenDetailsContent'>
            <TokenDetailsMenu tokenId={tokenId} />
            <div className='DetailsWidth pure-u-lg-19-24 pure-u-md-2-3 pure-u-1 pure-u-19-24'>
              {addMainTokenSale.state === 'deployed' || addMainTokenSale.state === 'token-transferred' || addMainTokenSale.state === 'authorized'
                ? <MainTokenSaleDetail /> : null
              }
              <div className='d-flex flex-v-center flex-h-center'>
                <div className='TokenDetailsBody d-flex flex-v-center flex-h-center pure-u-1'>
                  {addMainTokenSale.state === 'uninitialized' ? <TokenDetailsTutorial /> : null}
                  {addMainTokenSale.state === 'initialized' ? <MainTokenSaleInit tokenId={tokenId} /> : null}
                  {addMainTokenSale.state === 'deployed' ? <MainTokenSaleAddToken tokenId={tokenId} /> : null}
                  {addMainTokenSale.state === 'token-transferred' ? <MainTokenSaleAuthorize tokenId={tokenId} /> : null}
                  {addMainTokenSale.state === 'authorized' ? <div>{tokenSaleList.length === 0 ? <TokenDetailsTutorial /> : <TokenSaleListForToken contractAddress={tokenId} />}</div> : null}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    )
  }
}
export default translate('translations')(connect(s => s)(TokenDetails))
