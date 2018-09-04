import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import './MainTokenSaleDetail.css'
import iconToken from '../assets/images/token-name.svg'

class MainTokenSaleDetail extends React.Component {
  addTokenSale = () => {
    const { history, tokenId, addMainTokenSale } = this.props
    if (addMainTokenSale[tokenId] && addMainTokenSale[tokenId].state === 'authorized') {
      console.log('CREAZIONE FIGLIA')
      history.push(`/token/details/${tokenId}/add-token-sale`)
    }
  }

  render () {
    const { addMainTokenSale, t, mainTokenSale, tokenId } = this.props
    const addMainTokenSaleById = addMainTokenSale[tokenId]
    let waiting = t('Waiting...')
    return (
      <div id='MainTokenSaleDetail' className='shadow pure-u-xl-20-24 pure-u-23-24 d-flex flex-h-between'>

        <div className='d-flex flex-row flex-v-center pure-u-lg-10-24 pure-u-md-1 pure-u-sm-1 pure-u-1'>
          <div>
            <img className='iconToken' src={iconToken} />
          </div>
          <div className='pure-u-1 d-flex flex-row flex-v-center '>
            <div className='pure-u-lg-10-24 pure-u-md-8-24 pure-u-sm-7-24'>
              <h2>{t('Token Sale')}</h2>
            </div>
            <div className='pure-u-lg-14-24 pure-u-md-16-24 pure-u-sm-17-24 d-flex flex-column'>
              <h4>{t('Token for Sale')}</h4>
              <p> {(mainTokenSale.receipt && mainTokenSale.transferReceipt)
                ? addMainTokenSaleById.amount
                : waiting}</p>
            </div>
          </div>
        </div>

        {(mainTokenSale.receipt && mainTokenSale.transferReceipt && mainTokenSale.setAuthorizedReceipt)
          ? <div className='btnGroup d-flex flex-v-center flex-h-between pure-u-lg-14-24 pure-u-md-1 pure-u-sm-1 pure-u-1'>
            <div className='d-flex flex-h-center pure-u-lg-1-3 pure-u-md-1-3 pure-u-sm-1 pure-u-1'>
              <button className='pure-u-23-24' onClick={this.addTokenSale}>
                <span className='d-flex flex-h-center flex-v-center'>
                  <i className='fa fa-plus flex-row d-flex flex-h-center flex-v-center' />
                  {t('Add Token Sale')}
                </span>
              </button>
            </div>
            <div className='d-flex flex-h-center pure-u-lg-1-3 pure-u-md-1-3 pure-u-sm-1 pure-u-1'>
              <button className='pure-u-23-24'>
                <span className='d-flex flex-h-center flex-v-center'>
                  <i className='fa fa-plus flex-row d-flex flex-h-center flex-v-center' />
                  {t('Add More Token')}
                </span>
              </button>
            </div>
            <div className='d-flex flex-h-center pure-u-lg-1-3 pure-u-md-1-3 pure-u-sm-1 pure-u-1'>
              <button className='pure-u-23-24'>
                <span className='d-flex flex-h-center flex-v-center'>
                  <i className='fa fa-minus flex-row d-flex flex-h-center flex-v-center' />
                  {t('Remove token')}
                </span>
              </button>
            </div>
          </div>
          : null }
      </div>
    )
  }

}

export default withRouter(translate('translations')(connect(s => s)(MainTokenSaleDetail)))
