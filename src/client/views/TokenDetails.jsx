import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import './TokenDetails.css'
import PageNotFound from '../components/PageNotFound'
import TokenDetailsTutorial from '../components/TokenDetailsTutorial'
import TokenSaleListForToken from '../components/TokenSaleListForToken'
import MainTokenSaleDetail from '../components/MainTokenSaleDetail'
import MainTokenSaleInit from '../components/MainTokenSaleInit'

import { setInitialized } from '../redux/addMainTokenSale'

const TokenDetails = (props) => {
  const { match: { params: { tokenId } }, tokens: { transactions, receipts }, dispatch } = props
  // Get token receipt
  const receipt = receipts[tokenId]

  if (!receipt) {
    return (
      <PageNotFound />
    )
  }

  // Get token details
  const tokenDetails = transactions[receipt.transactionHash]
  const { t, tokenSales, mainTokenSales, addMainTokenSale } = props

  console.log('receipt', receipt, 'tokenDetails', tokenDetails)
  const mainTokenSale = mainTokenSales[tokenId]
  const mainTokenSaleAddress = mainTokenSale && mainTokenSale.receipt ? mainTokenSale.receipt.contractAddress : null
  const tokenSaleList = mainTokenSaleAddress ? tokenSales[mainTokenSaleAddress] : []
  return (
    <div>
      <div id='TokenDetails' className=''>
        <div className='TokenDetailsHeader top d-flex flex-row flex-h-start flex-v-center'>
          <div>
            <a href='/'><button><i className='fas fa-angle-left' /> back</button></a>
          </div>
          <div className='flex-v-center'>
            Token Name<br />
            {tokenDetails.name}
          </div>
          <div className='flex-v-center'>
            Token Symbol<br />
            {tokenDetails.symbol}
          </div>
          <div className='flex-v-center'>
          Decimals<br />
            {tokenDetails.decimals}
          </div>
          <div className='flex-v-center'>
            Total Supply<br />
            {tokenDetails.supply}
          </div>
          <div>Token Address:<br />{tokenId}</div>
          <div>Token Owner:<br />{receipt.owner}</div>
        </div>

        <div className='TokenDetailsContent bottom d-flex flex-row flex-h-start flex-v-center'>
          <div className='TokenDetailsMenu left '>
            Menu
            <div>
              <a href='#'><button onClick={() => dispatch(setInitialized(true))}><i className='fas fa-angle-left' /> {t('Add Token Sale')}</button></a>
            </div>
            <div>
              <a href='/'><button><i className='fas fa-angle-left' /> {t('Unlock The Token')}</button></a>
            </div>
            <div>
              <a href='/'><button><i className='fas fa-angle-left' /> {t('Change Token Owner')}</button></a>
            </div>
            <div>
              <a href='/'><button><i className='fas fa-angle-left' /> {t('Authorize Transfer')}</button></a>
            </div>
          </div>
          <div className='TokenDetailsBody right'>
            {mainTokenSale
              ? <div>
                <MainTokenSaleDetail />
                {tokenSaleList.length === 0 ? <TokenDetailsTutorial /> : <TokenSaleListForToken contractAddress={tokenId} /> }
              </div>
              : addMainTokenSale.initialized ? <MainTokenSaleInit tokenId={tokenId} /> : <TokenDetailsTutorial />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default translate('translations')(connect(s => s)(TokenDetails))
