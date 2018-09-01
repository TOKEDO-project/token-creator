import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import './TokenDetails.css'
import backIcon from '../assets/images/back.svg'
import padlockIcon from '../assets/images/padlock.svg'
import groupIcon from '../assets/images/groupIcon.svg'
import shieldIcon from '../assets/images/secure-shield.svg'
import addIcon from '../assets/images/addIcon.svg'
import PageNotFound from '../components/PageNotFound'
import TokenDetailsTutorial from '../components/TokenDetailsTutorial'
import TokenSaleListForToken from '../components/TokenSaleListForToken'
import MainTokenSaleDetail from '../components/MainTokenSaleDetail'
import MainTokenSaleInit from '../components/MainTokenSaleInit'
import MainTokenSaleAddToken from '../components/MainTokenSaleAddToken'
import MainTokenSaleAuthorize from '../components/MainTokenSaleAuthorize'

import { setState } from '../redux/addMainTokenSale'

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
  const tokenSaleList = mainTokenSaleAddress && tokenSales[mainTokenSaleAddress] ? tokenSales[mainTokenSaleAddress] : []

  // Temporary logic for menu
  let showMenu = true

  return (
    <div className='pure-u-1'>
      <div id='TokenDetails'>

        <div className=''>
          <div className='TokenDetailsHeader flexView flex-row flex-v-center shadow'>

            <div className='pure-u-lg-2-24 pure-u-md-1-1 pure-u-1'>
              <a href='/'><img src={backIcon} /></a>
            </div>
            <div className='pure-u-lg-2-24 pure-u-md-1-4 pure-u-1-4 textCenter'>
              <div className='d-flex flex-column flex-h-center heightBox borderRight'>
                <h4>{t('Token Name')}:</h4>
                <p>{tokenDetails.name}</p>
              </div>

            </div>
            <div className='pure-u-lg-2-24  pure-u-md-1-4 pure-u-1-4  textCenter'>
              <div className='d-flex flex-column flex-h-center heightBox borderRight'>
                <h4>{t('Token Symbol')}:</h4>
                <p>{tokenDetails.symbol}</p>
              </div>

            </div>
            <div className='pure-u-lg-2-24  pure-u-md-1-4 pure-u-1-4  textCenter'>
              <div className='d-flex flex-column flex-h-center heightBox borderRight'>
                <h4>{t('Decimals')}:</h4>
                <p>{tokenDetails.decimals}</p>
              </div>

            </div>
            <div className='pure-u-lg-2-24  pure-u-md-1-4 pure-u-1-4  textCenter'>
              <div className='d-flex flex-column flex-h-center heightBox borderRight'>
                <h4>{t('Total Supply')}:</h4>
                <p>{tokenDetails.supply}</p>
              </div>

            </div>
            <div className='pure-u-lg-7-24  pure-u-md-1-2 pure-u-1-2  paddingItems'>
              <div className='d-flex flex-column flex-h-center heightBox borderRight'>
                <h4>{t('Token Address')}:</h4>
                <p className='breakWord'>{tokenId}</p>
              </div>

            </div>
            <div className='pure-u-lg-7-24  pure-u-md-1-2 pure-u-1-2 paddingItems'>
              <div className='d-flex flex-column flex-h-center heightBox'>
                <h4>{t('Token Owner')}:</h4>
                <p className='breakWord'>{receipt.owner}</p>
              </div>

            </div>
          </div>
        </div>

        <div className='TokenDetailsContent'>
          <div className={`TokenDetailsMenu ${showMenu ? 'pure-u-lg-6-24 pure-u-md-1-2 pure-u-1' : 'widthMenuClosed'}`}>
            <div className={` ${showMenu ? 'handleMenu' : 'closedHandleMenu'}`}>

              {showMenu ? <p>{t('Close Menu')}</p> : <p>{t('Open')}<br />{t('Menu')}</p> }

              <i className={`fas fa-${showMenu ? 'close' : 'angle-right'}`} />
            </div>
            <div>
              <a href='#'>
                <button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`} onClick={() => dispatch(setState('initialized'))}><img src={addIcon} /> {showMenu ? t('Add Token Sale') : null}</button>
              </a>
            </div>
            <div>
              <a href='/'><button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={padlockIcon} />{showMenu ? t('Unlock The Token') : null}</button></a>
            </div>
            <div>
              <a href='/'><button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={groupIcon} />{showMenu ? t('Change Token Owner') : null}</button></a>
            </div>
            <div>
              <a href='/'><button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={shieldIcon} />{showMenu ? t('Authorize Transfer') : null}</button></a>
            </div>
          </div>
          <div className='pure-u-lg-19-24 pure-u-md-1-2 pure-u-1'>
            <div className='TokenDetailsBody d-flex flex-v-center flex-h-center pure-u-1'>
              {addMainTokenSale.state === 'uninitialized' ? <TokenDetailsTutorial /> : null}
              {addMainTokenSale.state === 'initialized' ? <MainTokenSaleInit tokenId={tokenId} /> : null}
              {addMainTokenSale.state === 'deployed' ? <MainTokenSaleAddToken tokenId={tokenId} /> : null}
              {addMainTokenSale.state === 'token-transferred' ? <MainTokenSaleAuthorize tokenId={tokenId} /> : null}
              {addMainTokenSale.state === 'authorized'
                ? <div>
                  <MainTokenSaleDetail />
                  {tokenSaleList.length === 0 ? <TokenDetailsTutorial /> : <TokenSaleListForToken contractAddress={tokenId} />}
                </div>
                : null
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default translate('translations')(connect(s => s)(TokenDetails))
