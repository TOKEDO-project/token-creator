import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'lodash'
import './MainTokenSaleDetail.css'
import iconToken from '../assets/images/token-name.svg'
import Loading from '../components/Loading'
import { getTokenInfo } from '../utils/tokens'

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
    const { addMainTokenSale, t, mainTokenSales, tokenId, tokens } = this.props
    const { addSaleInfo, addTokenInfo, removeTokenInfo } = this.state
    const tokenInfo = getTokenInfo(tokenId, tokens)
    const addMainTokenSaleById = addMainTokenSale[tokenId]
    const mainTokenSalesById = mainTokenSales[tokenId]
    let waiting = t('Waiting...')
    return (
      <div id='MainTokenSaleDetail' className='shadow pure-u-1 d-flex flex-h-between'>

        <div className='d-flex flex-row flex-v-center pure-u-lg-10-24 pure-u-md-1 pure-u-sm-1 pure-u-1'>
          <div>
            <img className='iconToken' src={iconToken} />
          </div>
          <div className='pure-u-1 d-flex flex-row flex-v-center '>
            <div className='pure-u-lg-10-24 pure-u-md-8-24 pure-u-sm-7-24'>
              <h2>{t('Your project')}</h2>
            </div>
            <div className='pure-u-lg-14-24 pure-u-md-16-24 pure-u-sm-17-24 d-flex flex-column'>
              <h4>{t('Tokens For Sale')}</h4>
              <p> {(!isEmpty(mainTokenSalesById.transferReceipt))
                ? addMainTokenSaleById.amount
                : waiting}</p>
            </div>
          </div>
        </div>

        {(!isEmpty(mainTokenSalesById.setAuthorizedReceipt) || tokenInfo.type === 'simple')
          ? <div className=' btnGroup d-flex flex-v-center flex-h-between pure-u-lg-14-24 pure-u-md-1 pure-u-sm-1 pure-u-1'>
            <div className='relative d-flex flex-h-center pure-u-lg-1-3 pure-u-md-1-3 pure-u-sm-1 pure-u-1'>
              { addSaleInfo ? <div className='shadow infoBox'>
                <p>{t('Create one or more token sale contracts to sell your tokens.')}</p>
              </div> : null}
              <button className='shadow orange pure-u-23-24 flex-row d-flex flex-h-center flex-v-center' onClick={this.addTokenSale}>
                <i className='fa fa-plus d-flex flex-h-center flex-v-center' />
                <span>
                  {t('Add Token Sale')}
                </span>
                <i onClick={(e) => { e.stopPropagation(); this.setState({addSaleInfo: !addSaleInfo, addTokenInfo: false, removeTokenInfo: false}) }}
                  className='fa fa-question d-flex flex-h-center flex-v-center' />
              </button>
            </div>
            <div className='relative d-flex flex-h-center pure-u-lg-1-3 pure-u-md-1-3 pure-u-sm-1 pure-u-1'>
              { addTokenInfo ? <div className='shadow infoBox'>
                <p>{t('Add more tokens to the Token Sale Manager to sell them in new sales.')} {t('NOTE')}: {t('when adding tokens you cannot exceed the total supply.')}</p>
              </div> : null }
              <button onClick={() => this.redirectTo(`/token/details/${tokenId}/add-more-token`)} className='shadow orange pure-u-23-24 flex-row d-flex flex-h-center flex-v-center'>
                <i className='fa fa-plus d-flex flex-h-center flex-v-center' />
                <span>
                  {t('Add More Tokens')}
                </span>
                <i onClick={(e) => { e.stopPropagation(); this.setState({addTokenInfo: !addTokenInfo, addSaleInfo: false, removeTokenInfo: false}) }}
                  className='fa fa-question d-flex flex-h-center flex-v-center' />
              </button>
            </div>
            <div className='relative d-flex flex-h-center pure-u-lg-1-3 pure-u-md-1-3 pure-u-sm-1 pure-u-1'>
              { removeTokenInfo ? <div className='shadow infoBox'>
                <p>{t('You can only remove tokens that have not been sold already.')}</p>
              </div> : null}
              <button onClick={() => this.redirectTo(`/token/details/${tokenId}/remove-token`)} className='shadow blue pure-u-23-24 flex-row d-flex flex-h-center flex-v-center'>
                <i className='fa fa-minus d-flex flex-h-center flex-v-center' />
                <span>
                  {t('Remove tokens')}
                </span>
                <i onClick={(e) => { e.stopPropagation(); this.setState({removeTokenInfo: !removeTokenInfo, addSaleInfo: false, addTokenInfo: false}) }}
                  className='fa fa-question d-flex flex-h-center flex-v-center' />
              </button>
            </div>
          </div>
          : <div className=' btnGroup d-flex flex-v-center flex-h-between pure-u-lg-14-24 pure-u-md-1 pure-u-sm-1 pure-u-1'>
            <Loading size='24' />
          </div> }
      </div>
    )
  }
}

export default withRouter(translate('translations')(connect(s => s)(MainTokenSaleDetail)))
