import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
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
            : <div className='pure-u-1'>
              {map(tokenSaleReceipts, (receipt, address) => {
                const tokenSale = tokenSaleTransactions[receipt.transactionHash]
                // open closed  controlla se passato l' end date
                const endTime = moment(parseInt(tokenSale.endTime))
                const today = moment(Date.now())
                const isOpen = moment(today).diff(endTime) < 0
                if (tokenSale.contractAddress) {
                  return (
                    <div id='TokenSaleListForToken' className='shadow pure-u-1' key={address}>

                      <div className='pure-u-1'>
                        <div className='pure-u-2-24 centerTxt'>
                          <img className='status' src={isOpen ? StatusOpen : StatusClosed} />
                          <h4>Status:</h4>
                          <span className={`${isOpen ? 'greenTxt' : 'redTxt'}`}>
                            {isOpen ? 'Open' : 'Close'}
                          </span>
                        </div>
                        <div className='pure-u-3-24 borderRight heightBox centerTxt'>
                          <h4>Token Price: </h4>
                          <p className='breakWord'>{tokenSale.price}</p>
                        </div>
                        <div className='pure-u-4-24 borderRight heightBox centerTxt'>
                          <h4>Token For Sale: </h4>
                          <p className='breakWord'>{tokenSale.amount}</p>
                        </div>
                        <div className='pure-u-3-24 borderRight heightBox centerTxt'>
                          <h4>Token Sold: </h4>
                          <p className='breakWord'>0</p>
                        </div>
                        <div className='pure-u-4-24 borderRight heightBox centerTxt'>
                          <h4>Remaining Token: </h4>
                          <p className='breakWord'>0</p>
                        </div>
                        <div className='pure-u-4-24 borderRight heightBox centerTxt'>
                          <h4>Min Contribution: </h4>
                          <p className='breakWord'>{tokenSale.minContribution}</p>
                        </div>
                        <div className='pure-u-4-24 heightBox centerTxt'>
                          <h4>ETH collected: </h4>
                          <p className='breakWord'> ETH: 0</p>
                        </div>
                      </div>

                      <div className='pure-u-1 marginTop'>
                        <div className='pure-u-2-24 centerTxt'>
                          <img className='kyc' src={tokenSale.kyc === 'true' ? kycYes : kycNo} />
                          <h4>KYC:</h4>
                          <span className={`${tokenSale.kyc === 'true' ? 'greenTxt' : 'redTxt'}`}>
                            {tokenSale.kyc === 'true' ? 'Yes' : 'No'}
                          </span>
                        </div>
                        <div className='pure-u-10-24 borderRight heightBox'>
                          <h4>Token Sale Address: </h4>
                          <p className='breakWord'>{tokenSale.contractAddress}</p>
                        </div>
                        <div className='pure-u-6-24 borderRight heightBox centerTxt'>
                          <h4>Start Time: </h4>
                          <p className='breakWord'>{tokenSale.startTime}</p>
                        </div>
                        <div className='pure-u-6-24 heightBox centerTxt'>
                          <h4>End Time: </h4>
                          <p className='breakWord'>{tokenSale.endTime}</p>
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

export default translate('translations')(connect(s => s)(TokenSaleListForToken))
