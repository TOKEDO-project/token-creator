import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import './Menu.css'

import home from '../assets/images/home.svg'
// import faq from '../assets/images/faq.svg'
import credits from '../assets/images/credits.svg'
import help from '../assets/images/helpMenu.svg'
import homeActive from '../assets/images/homeActive.svg'
import kyc from '../assets/images/userKYCme.svg'
// import faqActive from '../assets/images/faqActive.svg'
import creditsActive from '../assets/images/creditsActive.svg'
import helpActive from '../assets/images/helpMenuActive.svg'
import kycActive from '../assets/images/userKYCmeActive.svg'
class Menu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  toggleMenu = () => {
    this.setState({ open: !this.state.open })
  }
  render () {
    const { t, location: { pathname } } = this.props
    const { open } = this.state
    const routes = [
      { name: t('Home'), route: '/', img: home, imgActive: homeActive },
      // {name: t('FAQ'), route: '/faq', img: faq, imgActive: faqActive},
      { name: t('Help'), route: '/help', img: help, imgActive: helpActive },
      { name: t('Credits'), route: '/credits', img: credits, imgActive: creditsActive },
      { name: t('KYC'), route: '/kyc', img: kyc, imgActive: kycActive }
    ]
    return (
      <div>
        <span onClick={this.toggleMenu} className={`fa ${open ? 'open fa-times' : 'fa-bars'} d-flex flex-row flex-v-center`} />
        <div id='sidebar' className={`${open ? 'open' : ''} d-flex flex-column pure-u-1 pure-u-sm-1 pure-u-md-1-3 pure-u-lg-5-24 pure-u-xl-5-24`}>
          <div className='item title d-flex flex-row flex-h-between flex-v-center'>
            &nbsp;
          </div>
          {routes.map(({ name, route, img, imgActive }, index) =>
            <Link key={index} to={route} onClick={this.toggleMenu} className={`item ${pathname === route ? 'active' : ''} d-flex flex-row flex-v-center`}>
              <img className='mainMenuImg' src={pathname === route ? imgActive : img} /><span>{name}</span>
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(translate('translations')(Menu))
