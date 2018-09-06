import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import './Menu.css'

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
    const routes = [{name: t('Home'), route: '/'}, {name: t('FAQ'), route: '/faq'}, {name: t('Help'), route: '/help'}, {name: t('Credits'), route: '/credits'}]
    return (
      <div>
        <span onClick={this.toggleMenu} className={`fa ${open ? 'open fa-times' : 'fa-bars'} d-flex flex-row flex-v-center`} />
        <div id='sidebar' className={`${open ? 'open' : ''} d-flex flex-column`}>
          <div className='item title d-flex flex-row flex-h-between flex-v-center'>
            &nbsp;
          </div>
          {routes.map(({name, route}, index) =>
            <Link key={index} to={route} onClick={this.toggleMenu} className={`item ${pathname === route ? 'active' : ''} d-flex flex-row flex-h-between flex-v-center`}>
              <span>{name}</span>
            </Link>
          )}
        </div>
      </div>
    )
}
}

export default withRouter(translate('translations')(Menu))
