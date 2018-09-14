import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import backIcon from '../assets/images/back.svg'
import { Link } from 'react-router-dom'

class TokenDetailsTopBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showMenu: true
    }
  }

  render () {
    const { t } = this.props
    const { tokenDetails, tokenId, receipt } = this.props
    return (
      <div className='HeaderContainer shadow'>
        <div className='TokenDetailsHeader flexView flex-row flex-v-center '>
          <div className='lg-2s-24 pure-u-md-1-1 pure-u-sm-1'>
            <Link to='/'><img src={backIcon} /></Link>
          </div>
          <div className='pure-u-lg-3-24 pure-u-md-1-4 pure-u-1-4 textCenter'>
            <div className='d-flex flex-column flex-h-center heightBox borderRight'>
              <h4>{t('Token')}:</h4>
              <p className='breakWord'>{tokenDetails.name}</p>
            </div>
          </div>
          <div className='lg-2l-24 pure-u-md-1-4 pure-u-1-4  textCenter'>
            <div className='d-flex flex-column flex-h-center heightBox borderRight'>
              <h4>{t('Ticker')}:</h4>
              <p className='breakWord'>{tokenDetails.symbol}</p>
            </div>
          </div>
          <div className='lg-2s-24 pure-u-md-1-4 pure-u-1-4  textCenter'>
            <div className='d-flex flex-column flex-h-center heightBox borderRight'>
              <h4>{t('Decimals')}:</h4>
              <p className='breakWord'>{tokenDetails.decimals}</p>
            </div>
          </div>
          <div className='pure-u-lg-3-24  pure-u-md-1-4 pure-u-1-4  textCenter'>
            <div className='d-flex flex-column flex-h-center heightBox borderRight'>
              <h4>{t('Total Supply')}:</h4>
              <p className='breakWord'>{tokenDetails.supply}</p>
            </div>
          </div>
          <div className='pure-u-lg-6-24  pure-u-md-1-2 pure-u-1-2  paddingItems'>
            <div className='d-flex flex-column flex-h-center heightBox borderRight'>
              <h4>{t('Token Address')}:</h4>
              <p className='breakWord'>
                <a target='_blank' href={`${process.env.ETHERSCAN_URI}address/${tokenId}`}>
                  <i className='fas fa-external-link-alt' /> {tokenId}
                </a>
              </p>
            </div>
          </div>
          <div className='pure-u-lg-6-24  pure-u-md-1-2 pure-u-1-2 paddingItems'>
            <div className='d-flex flex-column flex-h-center heightBox'>
              <h4>{t('Token Owner')}:</h4>
              <p className='breakWord'>
                <a target='_blank' href={`${process.env.ETHERSCAN_URI}address/${receipt.owner}`}>
                  <i className='fas fa-external-link-alt' /> {receipt.owner}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default translate('translations')(connect(s => s)(TokenDetailsTopBar))
