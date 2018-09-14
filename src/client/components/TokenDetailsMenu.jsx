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
import trasferTokens from '../assets/images/transfer-token-gray.svg'
import { setState } from '../redux/addMainTokenSale'
import { setTokenMenu } from '../redux/preferences'
import './Menu.css'
import { getTokenInfo } from '../utils/tokens'
class TokenDetailsMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      addToggle: false,
      unlockToggle: false,
      changeToggle: false,
      authorizeToggle: false,
      transferToggle: false
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
    const { addToggle, unlockToggle, changeToggle, authorizeToggle, transferToggle } = this.state
    const { t, tokenId, preferences, mainTokenSales, location: { pathname }, tokens } = this.props
    const showMenu = preferences.showMenu
    const mainTokenSalesById = mainTokenSales[tokenId]
    const tokenInfo = getTokenInfo(tokenId, tokens)
    // const { showMenu } = this.state
    let includedStringPath = pathname.includes('unlock') || pathname.includes('change') || pathname.includes('authorize') || pathname.includes('tokens')
    return (
      <div className={` ${showMenu ? ' pure-u-1 pure-u-sm-1 pure-u-md-1-3 pure-u-lg-5-24 pure-u-xl-5-24'
        : 'pure-u-lg-4-24 pure-u-md-5-24 pure-u-1 pure-u-4-24'}`}>
        <div className={`TokenDetailsMenu ${showMenu ? 'pure-u-1' : 'widthMenuClosed'}`}>
          <div className={` ${showMenu ? 'handleMenu' : 'closedHandleMenu'}`} onClick={this.handleMenuStatus}>
            {showMenu ? <p >{t('Close Menu')}</p>
              : <p >{t('Open')}<br />{t('Menu')}</p>}
            <i className={`fas fa-${showMenu ? 'close' : 'angle-right'}`} />
          </div>
          <div className={` ${showMenu ? '' : 'hideMenuResponsive'}`}>
            {(mainTokenSalesById && (isEmpty(mainTokenSalesById.setAuthorizedReceipt) && tokenInfo.type !== 'simple'))
              ? <button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><div style={{ width: '21px', marginRight: '9px' }}>
                <Loading size='21' color='#ffffff' /></div><p className='marginTxt'>{showMenu ? t('Waiting...') : null}</p>
              </button>
              : <button
                onMouseEnter={() => { if (!showMenu) { this.setState({ addToggle: true }) } }}
                onMouseLeave={() => this.setState({ addToggle: false })}
                onClick={this.addTokenSale}
                className={` ${!includedStringPath && !showMenu ? 'active flex-h-center' : !includedStringPath ? 'active' : showMenu ? 'borderBtn' : 'flex-h-center'}`}>
                <img className={includedStringPath ? 'grayFilter' : ''} src={addIcon} />
                {showMenu || addToggle ? <p className={` ${addToggle ? 'hoverTxt' : 'marginTxt'}`}>{t('Add Token Sale')}</p> : null}
              </button>
            }

            {tokenInfo.type !== 'simple'
              ? <button
                onMouseEnter={() => { if (!showMenu) { this.setState({ unlockToggle: true }) } }}
                onMouseLeave={() => this.setState({ unlockToggle: false })}
                onClick={() => this.redirectTo(`/token/details/${tokenId}/unlock-the-token`)}
                className={` ${pathname.includes('unlock') && !showMenu ? 'active flex-h-center' : pathname.includes('unlock') ? 'active' : showMenu ? 'borderBtn' : 'flex-h-center'}`}>
                <img className={pathname.includes('unlock') ? '' : 'grayFilter'} src={padlockIcon} />
                {showMenu || unlockToggle ? <p className={` ${unlockToggle ? 'hoverTxt' : 'marginTxt'}`}>{t('Unlock Token')}</p> : null}
              </button>
              : null
            }

            {/* <button
              onMouseEnter={() => { if (!showMenu) { this.setState({ changeToggle: true }) } }}
              onMouseLeave={() => this.setState({ changeToggle: false })}
              onClick={() => this.redirectTo(`/token/details/${tokenId}/change-token-owner`)}
              className={` ${pathname.includes('change') && !showMenu ? 'active flex-h-center' : pathname.includes('change') ? 'active' : showMenu ? 'borderBtn' : 'flex-h-center'}`}>
              <img className={pathname.includes('change') ? '' : 'grayFilter'} src={groupIcon} />
              {showMenu || changeToggle ? <p className={` ${changeToggle ? 'hoverTxt' : 'marginTxt'}`}>{t('Change Token Owner')}</p> : null}
            </button> */}

            {tokenInfo.type !== 'simple'
              ? <button
                onMouseEnter={() => { if (!showMenu) { this.setState({ authorizeToggle: true }) } }}
                onMouseLeave={() => this.setState({ authorizeToggle: false })}
                onClick={() => this.redirectTo(`/token/details/${tokenId}/authorize-transfer`)}
                className={` ${pathname.includes('authorize') && !showMenu ? 'active flex-h-center' : pathname.includes('authorize') ? 'active' : showMenu ? 'borderBtn' : 'flex-h-center'}`}>
                <img className={pathname.includes('authorize') ? '' : 'grayFilter'} src={shieldIcon} />
                {showMenu || authorizeToggle ? <p className={` ${authorizeToggle ? 'hoverTxt' : 'marginTxt'}`}>{t('Authorize Transfer')}</p> : null}
              </button>
              : null
            }
            <button
              onMouseEnter={() => { if (!showMenu) { this.setState({ transferToggle: true }) } }}
              onMouseLeave={() => this.setState({ transferToggle: false })}
              onClick={() => this.redirectTo(`/token/details/${tokenId}/transfer-tokens`)}
              className={` ${pathname.includes('tokens') && !showMenu ? 'active flex-h-center' : pathname.includes('tokens') ? 'active' : showMenu ? 'borderBtn' : 'flex-h-center'}`}>
              <img className={pathname.includes('tokens') ? '' : 'grayFilter'} src={trasferTokens} />
              {showMenu || transferToggle ? <p className={` ${transferToggle ? 'hoverTxt' : 'marginTxt'}`}>{t('Transfer Tokens')}</p> : null}
            </button>

          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(translate('translations')(connect(s => s)(TokenDetailsMenu)))
