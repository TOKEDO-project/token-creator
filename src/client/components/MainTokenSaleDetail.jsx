import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import './MainTokenSaleDetail.css'
import iconToken from '../assets/images/token-name.svg'

class MainTokenSaleDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      addSaleInfo: false,
      addTokenInfo: false,
      removeTokenInfo: false
    }
  }
  addTokenSale = () => {
    const { history, tokenId, addMainTokenSale } = this.props
    if (addMainTokenSale[tokenId] && addMainTokenSale[tokenId].state === 'authorized') {
      history.push(`/token/details/${tokenId}/add-token-sale`)
    }
  }
  redirectTo = (href) => {
    const { history } = this.props
    history.push(href)
  }

  render () {
    const { addMainTokenSale, t, mainTokenSale, tokenId } = this.props
    const { addSaleInfo, addTokenInfo, removeTokenInfo } = this.state
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
          ? <div className=' btnGroup d-flex flex-v-center flex-h-between pure-u-lg-14-24 pure-u-md-1 pure-u-sm-1 pure-u-1'>
            <div className='relative d-flex flex-h-center pure-u-lg-1-3 pure-u-md-1-3 pure-u-sm-1 pure-u-1'>
              { addSaleInfo ? <div className='infoBox'>
                <p>{t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cursus, erat quis feugiat vehicula, quam justo rhoncus justo, eu ornare nulla felis nec mauris. ')}</p>
              </div> : null}
              <button className='orange pure-u-23-24 flex-row d-flex flex-h-center flex-v-center' onClick={this.addTokenSale}>
                <i className='fa fa-plus d-flex flex-h-center flex-v-center' />
                <span>
                  {t('Add Token Sale')}
                </span>
                <i onClick={(e) => { e.stopPropagation(); this.setState({addSaleInfo: !addSaleInfo, addTokenInfo: false, removeTokenInfo: false}) }}
                  className='fa fa-question d-flex flex-h-center flex-v-center' />
              </button>
            </div>
            <div className='relative d-flex flex-h-center pure-u-lg-1-3 pure-u-md-1-3 pure-u-sm-1 pure-u-1'>
              { addTokenInfo ? <div className='infoBox'>
                <p>{t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cursus, erat quis feugiat vehicula, quam justo rhoncus justo, eu ornare nulla felis nec mauris. ')}</p>
              </div> : null }
              <button onClick={() => this.redirectTo(`/token/details/${tokenId}/add-more-token`)} className='orange pure-u-23-24 flex-row d-flex flex-h-center flex-v-center'>
                <i className='fa fa-plus d-flex flex-h-center flex-v-center' />
                <span>
                  {t('Add More Token')}
                </span>
                <i onClick={(e) => { e.stopPropagation(); this.setState({addTokenInfo: !addTokenInfo, addSaleInfo: false, removeTokenInfo: false}) }}
                  className='fa fa-question d-flex flex-h-center flex-v-center' />
              </button>
            </div>
            <div className='relative d-flex flex-h-center pure-u-lg-1-3 pure-u-md-1-3 pure-u-sm-1 pure-u-1'>
              { removeTokenInfo ? <div className='infoBox'>
                <p>{t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cursus, erat quis feugiat vehicula, quam justo rhoncus justo, eu ornare nulla felis nec mauris. ')}</p>
              </div> : null}
              <button onClick={() => this.redirectTo(`/token/details/${tokenId}/remove-token`)} className='blue pure-u-23-24 flex-row d-flex flex-h-center flex-v-center'>
                <i className='fa fa-minus d-flex flex-h-center flex-v-center' />
                <span>
                  {t('Remove token')}
                </span>
                <i onClick={(e) => { e.stopPropagation(); this.setState({removeTokenInfo: !removeTokenInfo, addSaleInfo: false, addTokenInfo: false}) }}
                  className='fa fa-question d-flex flex-h-center flex-v-center' />
              </button>
            </div>
          </div>
          : null }
      </div>
    )
  }
}

export default withRouter(translate('translations')(connect(s => s)(MainTokenSaleDetail)))
