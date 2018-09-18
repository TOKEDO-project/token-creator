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

                        <div className='pure-u-21-24'>
                          <div className='marginTopSmall pure-u-1 pure-u-sm-1 pure-u-md-1 pure-u-lg-12-24 pure-u-xl-12-24'>
                            <div className='pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-6-24 pure-u-xl-6-24 borderRight centerTextResponsive'>
                              <div className='heightBox'><h4>{t('Price')}</h4></div>
                              <div className='heightBox'> <p className='breakWord'>{t(tokenSale.price)}</p></div>
                            </div>
                            <div className='pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-9-24 pure-u-xl-9-24 borderRight centerTxt'>
                              <div className='heightBox'><h4>{t('Tokens For Sale')}</h4></div>
                              <div className='heightBox'><p className='breakWord'>{t(tokenSale.amount)}</p></div>
                            </div>
                            <div className='pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-9-24 pure-u-xl-9-24 borderRight centerTxt'>
                              <div className='heightBox'><h4>{t('Tokens Sold')}</h4></div>
                              <div className='heightBox'><p className='breakWord'>{t('0')}</p></div>
                            </div>
                          </div>
                          <div className='marginTopSmall pure-u-1 pure-u-sm-1 pure-u-md-1 pure-u-lg-12-24 pure-u-xl-12-24'>
                            <div className='pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-1-3 pure-u-xl-1-3 borderRight centerTxt'>
                              <div className='heightBox'><h4>{t('Remaining Tokens')}</h4></div>
                              <div className='heightBox'><p className='breakWord'>{t('0')}</p></div>
                            </div>
                            <div className='pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-1-3 pure-u-xl-1-3 borderRight centerTxt'>
                              <div className='heightBox'><h4>{t('Min Contribution')}</h4></div>
                              <div className='heightBox'><p className='breakWord'>{t(tokenSale.minContribution)}</p></div>
                            </div>
                            <div className='pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-1-3 pure-u-xl-1-3 centerTxt'>
                              <div className='heightBox'><h4>{t('ETH collected')}</h4></div>
                              <div className='heightBox'><p className='breakWord'> {t('ETH')} 0</p></div>
                            </div>
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
                        <div className='pure-u-21-24 borderTop paddingTop'>
                          <div className=''>
                            <div className='centerResponsive pure-u-1 pure-u-sm-1 pure-u-md-1 pure-u-lg-12-24 pure-u-xl-12-24'>
                              <div className='pure-u-1 borderRight'>
                                <div className='heightBox'> <h4>{t('Token Sale Address')}:</h4></div>
                                <div className='heightBox'> <p className='breakWord'>{tokenSale.contractAddress}</p></div>

                              </div>
                              <TokenSaleContractAddressClipboard address={tokenSale.contractAddress} />
                            </div>
                            <div className='marginTopSmall pure-u-1 pure-u-sm-1 pure-u-md-1 pure-u-lg-12-24 pure-u-xl-12-24'>
                              <div className='pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-8-24 pure-u-xl-8-24 centerTxt'>
                                <div className='pure-u-1 borderRight '>
                                  <div className='heightBox'><h4>{t('Start Time')}:</h4></div>
                                  <div className='heightBox'><p className='breakWord'>{moment(startTime, 'x').format('YYYY-MM-DD HH:mm')}<br /> (UTC {moment(startTime, 'x').format('Z')})</p></div>
                                </div>
                                <button onClick={(e) => this.onClickChangeDates(e, receipt.transactionHash)} className='modify shadow' type='button'>
                                  <span className='fa fa-pencil-square-o' />
                                  <span>{t('Modify')}</span>
                                </button>
                              </div>
                              <div className='pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-8-24 pure-u-xl-8-24 centerTxt'>
                                <div className='pure-u-1'>
                                  <div className='heightBox'><h4>{t('End Time')}:</h4></div>
                                  <div className='heightBox'><p className='breakWord'>{moment(endTime, 'x').format('YYYY-MM-DD HH:mm')}<br /> (UTC {moment(endTime, 'x').format('Z')})</p></div>
                                </div>
                                <button onClick={(e) => this.onClickChangeDates(e, receipt.transactionHash)} className='modify shadow' type='button'>
                                  <span className='fa fa-pencil-square-o' />
                                  <span>{t('Modify')}</span>
                                </button>
                              </div>
                            </div>
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
