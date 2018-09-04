import React from 'react'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import './Menu.css'

const Menu = ({ open, location: { pathname }, t }) => {
  const routes = [{name: 'Home', route: '/'}, {name: 'FAQ', route: '/faq'}, {name: 'Help', route: '/help'}, {name: 'Credits', route: '/credits'}]
  return (
    <div id='sidebar' className={`${open ? 'open' : ''} d-flex flex-column`}>
      <div className='item title d-flex flex-row flex-h-between flex-v-center'>
        <span>{t('Menu')}</span>
      </div>
      {routes.map(({name, route}, index) =>
        <a key={index} href={route} className={`item ${pathname === route ? 'active' : ''} d-flex flex-row flex-h-between flex-v-center`}>
          <span>{name}</span>
        </a>
      )}
    </div>
  )
}

export default withRouter(translate('translations')(Menu))
