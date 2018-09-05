import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'lodash'

import Loading from './Loading'
import padlockIcon from '../assets/images/padlock.svg'
import groupIcon from '../assets/images/groupIcon.svg'
import shieldIcon from '../assets/images/secure-shield.svg'
import addIcon from '../assets/images/addIcon.svg'
import trasferTokens from '../assets/images/transfer-tokens.svg'
import { setState } from '../redux/addMainTokenSale'
import { setTokenMenu } from '../redux/preferences'

class TokenDetailsMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showMenu: true
    }
  }

  addTokenSale = () => {
    const { history, dispatch, tokenId, addMainTokenSale } = this.props
    if (!addMainTokenSale[tokenId] || addMainTokenSale[tokenId].state === 'uninitialized') {
      dispatch(setState({ state: 'initialized', tokenAddress: tokenId }))
    }
    if (addMainTokenSale[tokenId] && addMainTokenSale[tokenId].state === 'authorized') {
      history.push(`/token/details/${tokenId}/add-token-sale`)
    }
  }
  handleMenuStatus = () => {
    console.log('handleMenuStatus')
    const { dispatch, preferences } = this.props
    const showMenu = preferences.showMenu
    console.log('showMenu', showMenu)
    dispatch(setTokenMenu(!showMenu))
  }
  redirectTo = (href) => {
    const { history } = this.props
    history.push(href)
  }
  render () {
    const { t, tokenId, preferences, mainTokenSales } = this.props
    const showMenu = preferences.showMenu
    const mainTokenSalesById = mainTokenSales[tokenId]
    // const { showMenu } = this.state
    return (
      <div className={` ${showMenu ? 'pure-u-lg-5-24 pure-u-md-1-3 pure-u-1 pure-u-5-24'
        : 'pure-u-lg-4-24 pure-u-md-5-24 pure-u-1 pure-u-4-24'}`}>
        <div className={`TokenDetailsMenu ${showMenu ? 'pure-u-1' : 'widthMenuClosed'}`}>
          <div className={` ${showMenu ? 'handleMenu' : 'closedHandleMenu'}`} onClick={this.handleMenuStatus}>
            {showMenu ? <p >{t('Close Menu')}</p>
              : <p >{t('Open')}<br />{t('Menu')}</p>}
            <i className={`fas fa-${showMenu ? 'close' : 'angle-right'}`} />
          </div>
          <div className={` ${showMenu ? '' : 'hideMenuResponsive'}`}>
            {(mainTokenSalesById && isEmpty(mainTokenSalesById.setAuthorizedReceipt))
              ? <button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><div style={{ width: '21px', marginRight: '9px' }}><Loading size='21' color='#ffffff' /></div><p className='marginTxt'>{showMenu ? t('Waiting...') : null}</p></button>
              : <button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`} onClick={this.addTokenSale}><img src={addIcon} /><p className='marginTxt'>{showMenu ? t('Add Token Sale') : null}</p></button>
            }
            <button onClick={() => this.redirectTo(`/token/details/${tokenId}/unlock-the-token`)} className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={padlockIcon} /><p className='marginTxt'>{showMenu ? t('Unlock The Token') : null}</p></button>
            <button onClick={() => this.redirectTo(`/token/details/${tokenId}/change-token-owner`)} className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={groupIcon} /><p className='marginTxt'>{showMenu ? t('Change Token Owner') : null}</p></button>
            <button onClick={() => this.redirectTo(`/token/details/${tokenId}/authorize-transfer`)} className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={shieldIcon} /><p className='marginTxt'>{showMenu ? t('Authorize Transfer') : null}</p></button>
            <button onClick={() => this.redirectTo(`/token/details/${tokenId}/transfer-tokens`)} className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={trasferTokens} /><p className='marginTxt'>{showMenu ? t('Transfer Tokens') : null}</p></button>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(TokenDetailsMenu)))
