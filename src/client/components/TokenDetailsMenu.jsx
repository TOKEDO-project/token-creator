import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import padlockIcon from '../assets/images/padlock.svg'
import groupIcon from '../assets/images/groupIcon.svg'
import shieldIcon from '../assets/images/secure-shield.svg'
import addIcon from '../assets/images/addIcon.svg'
import { setState } from '../redux/addMainTokenSale'

class TokenDetailsMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showMenu: true
    }
  }

  addTokenSale = () => {
    const { dispatch, tokenId } = this.props
    dispatch(setState({ state: 'initialized', tokenAddress: tokenId }))
  }

  render () {
    const { t } = this.props
    const { showMenu } = this.state
    return (
      <div className={` ${showMenu ? 'pure-u-lg-5-24 pure-u-md-1-3 pure-u-1 pure-u-5-24'
        : 'pure-u-lg-4-24 pure-u-md-5-24 pure-u-1 pure-u-4-24'}`}>
        <div className={`TokenDetailsMenu ${showMenu ? 'pure-u-1' : 'widthMenuClosed'}`}>
          <div className={` ${showMenu ? 'handleMenu' : 'closedHandleMenu'}`} onClick={() => { this.setState({ showMenu: !showMenu }) }}>
            {showMenu ? <p >{t('Close Menu')}</p>
              : <p >{t('Open')}<br />{t('Menu')}</p>}
            <i className={`fas fa-${showMenu ? 'close' : 'angle-right'}`} />
          </div>
          <div className={` ${showMenu ? '' : 'hideMenuResponsive'}`}>
            <a href='#'><button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`} onClick={this.addTokenSale}><img src={addIcon} /><p>{showMenu ? t('Add Token Sale') : null}</p></button></a>
            <a href='/'><button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={padlockIcon} /><p>{showMenu ? t('Unlock The Token') : null}</p></button></a>
            <a href='/'><button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={groupIcon} /><p>{showMenu ? t('Change Token Owner') : null}</p></button></a>
            <a href='/'><button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><img src={shieldIcon} /><p>{showMenu ? t('Authorize Transfer') : null}</p></button></a>
          </div>
        </div>
      </div>
    )
  }
}
export default translate('translations')(connect(s => s)(TokenDetailsMenu))
