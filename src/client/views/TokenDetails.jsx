import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import './TokenDetails.css'
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
import TokenDetailsTopBar from '../components/TokenDetailsTopBar'

import { setState } from '../redux/addMainTokenSale'

class TokenDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showMenu: true
    }
  }

  render () {
    const { match: { params: { tokenId } }, tokens: { transactions, receipts }, dispatch } = this.props
    const { showMenu } = this.state

    // Get token receipt
    const receipt = receipts[tokenId]

    if (!receipt) {
      return (
        <PageNotFound />
      )
    }

    // Get token details
    const tokenDetails = transactions[receipt.transactionHash]
    const { t, tokenSales, mainTokenSales, addMainTokenSale } = this.props

    console.log('receipt', receipt, 'tokenDetails', tokenDetails)
    const mainTokenSale = mainTokenSales[tokenId]
    const mainTokenSaleAddress = mainTokenSale && mainTokenSale.receipt ? mainTokenSale.receipt.contractAddress : null
    const tokenSaleList = mainTokenSaleAddress && tokenSales[mainTokenSaleAddress] ? tokenSales[mainTokenSaleAddress] : []

    return (
      <div className='pure-u-1'>
        <div id='TokenDetails'>
          <TokenDetailsTopBar tokenDetails={tokenDetails} tokenId={tokenId} receipt={receipt} />
          <div className='TokenDetailsContent'>

            <div className={` ${showMenu ? 'pure-u-lg-5-24 pure-u-md-1-3 pure-u-1 pure-u-5-24'
              : 'pure-u-lg-4-24 pure-u-md-5-24 pure-u-1 pure-u-4-24'}`}>
              <div className={`TokenDetailsMenu ${showMenu ? 'pure-u-1' : 'widthMenuClosed'}`}>
                <div className={` ${showMenu ? 'handleMenu' : 'closedHandleMenu'}`} onClick={() => { this.setState({ showMenu: !showMenu }) }}>
                  {showMenu ? <p >{t('Close Menu')}</p>
                    : <p >{t('Open')}<br />{t('Menu')}</p>}
                  <i className={`fas fa-${showMenu ? 'close' : 'angle-right'}`} />
                </div>
                <div className={` ${showMenu ? '' : 'hideMenuResponsive'}`}>
                  <a href='#'><button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`} onClick={() => dispatch(setState('initialized'))}><img src={addIcon} /><p>{showMenu ? t('Add Token Sale') : null}</p></button></a>
                  <a href='/'><button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={padlockIcon} /><p>{showMenu ? t('Unlock The Token') : null}</p></button></a>
                  <a href='/'><button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={groupIcon} /><p>{showMenu ? t('Change Token Owner') : null}</p></button></a>
                  <a href='/'><button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={shieldIcon} /><p>{showMenu ? t('Authorize Transfer') : null}</p></button></a>
                </div>
              </div>
            </div>

            <div className='DetailsWidth pure-u-lg-19-24 pure-u-md-2-3 pure-u-1 pure-u-19-24'>

              <div className='d-flex flex-v-center flex-h-center'>
                <div className='TokenDetailsBody d-flex flex-v-center flex-h-center pure-u-1'>
                  {addMainTokenSale.state === 'deployed' || addMainTokenSale.state === 'token-transferred' || addMainTokenSale.state === 'authorized'
                    ? <MainTokenSaleDetail /> : null
                  }
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
