import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import TokenDetailsTutorial from './TokenDetailsTutorial'
import AddTokenSaleWizard from './AddTokenSaleWizard'
import AddTokenSaleAdvanced from './AddTokenSaleAdvanced'
import { reset } from '../redux/addTokenSale'
import { isEmpty, map } from 'lodash'
import './TokenSaleListForToken.css'
import moment from 'moment'
import kycYes from '../assets/images/token-sale-kyc-yes.svg'
import kycNo from '../assets/images/token-sale-kyc-no.svg'
import StatusOpen from '../assets/images/token-sale-status-open.svg'
import StatusClosed from '../assets/images/token-sale-status-closed.svg'
import Clipboard from 'react-clipboard.js'
import { getTokenSaleTimes } from '../utils/tokenSales'

class TokenSaleListForToken extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      addTokenSaleFormType: 'wizard'
    }
  }

  componentDidMount () {
    const { dispatch, tokenId, addTokenSale } = this.props
    // const step = addTokenSale[tokenId].step
    if (!addTokenSale[tokenId]) {
      dispatch(reset({ tokenAddress: tokenId }))
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

  onClickChangeDates = (e, transactionHash) => {
    const { history, tokenId } = this.props
    e.preventDefault()
    history.push(`/token/details/${tokenId}/${transactionHash}/changeStartEndTimeTokenSale`)
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
              <a className='wizard' href='' onClick={this.onClickSetWizard}>{t('< Back to wizard mode')}</a><AddTokenSaleAdvanced tokenId={tokenId} />
            </div>}
        </div>
      )
    }
    return (
      <div className='pure-u-1'>
        {
          isEmpty(tokenSaleReceipts)
            ? <TokenDetailsTutorial tokenId={tokenId} />
            : <div className='pure-u-1'>
              {map(tokenSaleReceipts, (receipt, address) => {
                const tokenSale = tokenSaleTransactions[receipt.transactionHash]
                const { startTime, endTime } = getTokenSaleTimes(tokenSale)
                const today = moment()
                const isOpen = today.diff(moment(endTime, 'x')) < 0
                if (tokenSale.contractAddress) {
                  return (
                    <div id='TokenSaleListForToken' className='shadow pure-u-1' key={address}>

                      <div className='pure-u-1'>

                        <div className='pure-u-3-24 centerTxt'>
                          <img className='status' src={isOpen ? StatusOpen : StatusClosed} />
                          <h4>{t('Status')}:</h4>
                          <span className={`${isOpen ? 'greenTxt' : 'redTxt'}`}>
                            {isOpen ? t('Open') : t('Close')}
                          </span>
                        </div>

                        <div className='pure-u-20-24'>
                          <div className='pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-3-24 pure-u-xl-3-24 borderRight heightBox centerTextResponsive'>
                            <h4>{t('Token Price')}:</h4>
                            <p className='breakWord'>{t(tokenSale.price)}</p>
                          </div>
                          <div className='pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-5-24 pure-u-xl-5-24 borderRight heightBox centerTxt'>
                            <h4>{t('Token For Sale')}:</h4>
                            <p className='breakWord'>{t(tokenSale.amount)}</p>
                          </div>
                          <div className='pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-4-24 pure-u-xl-4-24 borderRight heightBox centerTxt'>
                            <h4>{t('Token Sold')}:</h4>
                            <p className='breakWord'>{t('0')}</p>
                          </div>
                          <div className='pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-4-24 pure-u-xl-4-24 borderRight heightBox centerTxt'>
                            <h4>{t('Remaining Token')}:</h4>
                            <p className='breakWord'>{t('0')}</p>
                          </div>
                          <div className='pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-4-24 pure-u-xl-4-24borderRight heightBox centerTxt'>
                            <h4>{t('Min Contribution')}:</h4>
                            <p className='breakWord'>{t(tokenSale.minContribution)}</p>
                          </div>
                          <div className='pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-4-24 pure-u-xl-4-24 heightBox centerTxt'>
                            <h4>{t('ETH collected')}:</h4>
                            <p className='breakWord'> {t('ETH')} 0</p>
                          </div>
                        </div>

                      </div>

                      <div className='pure-u-1'>

                        <div className='pure-u-3-24 centerTxt marginTop'>
                          <img className='kyc' src={tokenSale.kyc === 'true' ? kycYes : kycNo} />
                          <h4>{t('KYC')}:</h4>
                          <span className={`${tokenSale.kyc === 'true' ? 'greenTxt' : 'redTxt'}`}>
                            {tokenSale.kyc === 'true' ? t('Yes') : t('No')}
                          </span>
                        </div>

                        <div className='pure-u-20-24 borderTop paddingTop'>
                          <div className='centerResponsive pure-u-1 pure-u-sm-1 pure-u-md-1 pure-u-lg-12-24 pure-u-xl-12-24'>
                            <div className='pure-u-1 borderRight heightBox '>
                              <h4>{t('Token Sale Address')}:</h4>
                              <p className='breakWord'>{tokenSale.contractAddress}</p>
                            </div>
                            <TokenSaleContractAddressClipboard address={tokenSale.contractAddress} />
                          </div>
                          <div className='pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-4-24 pure-u-xl-4-24 centerTxt'>
                            <div className='pure-u-1 borderRight heightBox'>
                              <h4>{t('Start Time')}:</h4>
                              <p className='breakWord'>{moment(startTime, 'x').format('DD/MM/YYYY')}</p>
                            </div>
                            <button onClick={(e) => this.onClickChangeDates(e, receipt.transactionHash)} className='modify shadow' type='button'>
                              <span className='fa fa-pencil-square-o' />
                              <span className='font-size-tiny'>{t('Modify')}</span>
                            </button>
                          </div>
                          <div className='pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-4-24 pure-u-xl-4-24 centerTxt'>
                            <div className='pure-u-1 heightBox'>
                              <h4>{t('End Time')}:</h4>
                              <p className='breakWord'>{moment(endTime, 'x').format('DD/MM/YYYY')}</p>
                            </div>
                            <button onClick={(e) => this.onClickChangeDates(e, receipt.transactionHash)} className='modify shadow' type='button'>
                              <span className='fa fa-pencil-square-o' />
                              <span className='font-size-tiny'>{t('Modify')}</span>
                            </button>
                          </div>
                        </div>

                      </div>
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

class TokenSaleContractAddressClipboard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isAddressCopied: false
    }
  }

  onSuccessCopy = () => {
    this.setState({ isAddressCopied: true })
  }

  render () {
    const { address } = this.props
    const { isAddressCopied } = this.state
    return (
      <Clipboard onSuccess={this.onSuccessCopy} data-clipboard-text={address} className={`copy shadow ${isAddressCopied ? 'copied' : ''}`} type='button'>
        <div className='d-flex flex-row flex-v-center'>
          <span className={`fa fa-${isAddressCopied ? 'check' : 'clipboard'}`} />
          <span className='font-size-tiny'>{isAddressCopied ? 'Copied' : 'Copy'}</span>
        </div>
      </Clipboard>
    )
  }
}

export default withRouter(translate('translations')(connect(s => s)(TokenSaleListForToken)))
