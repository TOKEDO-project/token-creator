import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import shuttle from '../assets/images/shuttle.svg'
import TokenList from '../components/TokenList'
import './Home.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  redirectTo = (href) => {
    const { history } = this.props
    history.push(href)
  }

  render () {
    const { t, tokens } = this.props

    if (!tokens || Object.keys(tokens.receipts).length === 0) {
      return (
        <div id='home' className='pure-u-1 d-flex flex-column flex-h-center flex-v-center'>
          <img className='shuttle' src={shuttle} alt='Home' />
          <span className='message'>{t('Your Token Sale in 5 Minutes')}</span>
          <a href='/token/add/wizard'>
            <button type='button' className='start-now'>
              {t('START NOW!')}
            </button>
          </a>
        </div>
      )
    }
    return <TokenList tokens={tokens} />
  }
}

export default translate('translations')(connect(s => s)(Home))
