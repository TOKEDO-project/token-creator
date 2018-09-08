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
import ModalSelector from '../components/ModalSelector'

class TokenDetails extends React.Component {
  render () {
    const { match: { params: { tokenId, tokenSaleTransactionId } }, tokens: { transactions, receipts }, addMainTokenSale, mainTokenSales, addTokenSaleForm, setModal } = this.props

    // Get token receipt
    const receipt = receipts[tokenId]

    if (!receipt) {
      return (
        <PageNotFound />
      )
    }

    // Get token details
    const tokenDetails = transactions[receipt.transactionHash]
    const mainTokenSale = mainTokenSales[tokenId]
    const mainTokenSaleAddress = mainTokenSale && mainTokenSale.receipt ? mainTokenSale.receipt.contractAddress : null

    return (
      <div className='pure-u-1'>
        <div id='TokenDetails'>
          <TokenDetailsTopBar tokenDetails={tokenDetails} tokenId={tokenId} receipt={receipt} />
          <div className='TokenDetailsContent'>
            <TokenDetailsMenu tokenId={tokenId} />
            <div className='DetailsWidth pure-u-lg-19-24 pure-u-md-2-3 pure-u-1'>
              {mainTokenSale
                ? <MainTokenSaleDetail mainTokenSale={mainTokenSale} tokenId={tokenId} /> : null
              }
              <div className='d-flex flex-v-center flex-h-center'>
                <div className='TokenDetailsBody d-flex flex-v-center flex-h-center pure-u-1'>
                  {!addMainTokenSale[tokenId] || (!addMainTokenSale[tokenId].state || addMainTokenSale[tokenId].state === 'uninitialized') ? <TokenDetailsTutorial tokenId={tokenId} /> : null}
                  {addMainTokenSale[tokenId] && addMainTokenSale[tokenId].state === 'initialized' ? <MainTokenSaleInit tokenId={tokenId} /> : null}
                  {addMainTokenSale[tokenId] && addMainTokenSale[tokenId].state === 'deployed' ? <MainTokenSaleAddToken tokenId={tokenId} /> : null}
                  {addMainTokenSale[tokenId] && addMainTokenSale[tokenId].state === 'token-transferred' ? <MainTokenSaleAuthorize tokenId={tokenId} /> : null}
                  {addMainTokenSale[tokenId] && addMainTokenSale[tokenId].state === 'authorized' ? <TokenSaleListForToken addTokenSaleForm={addTokenSaleForm} tokenId={tokenId} mainTokenSale={mainTokenSale} mainTokenSaleAddress={mainTokenSaleAddress} /> : null}
                </div>
              </div>

            </div>

          </div>
        </div>
        <ModalSelector setModal={setModal} tokenId={tokenId} tokenSaleTransactionId={tokenSaleTransactionId} />
      </div>
    )
  }
}
export default translate('translations')(connect(s => s)(TokenDetails))
