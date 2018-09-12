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
          <h1 className='message font-size-huge'>{t('Your Token Sale in 5 Minutes')}</h1>
          <div className='font-size-tiny pure-u-1 pure-u-sm-1 pure-u-md-22-24 pure-u-lg-10-24 pure-xl-10-24 homeText shadow'>
            <p>
              {t('It’s quick, it’s easy. Tokenize your company')}
              <br />
              {t('with just a few clicks!')}
            </p>
            <p>
              {t('Access the perks of the tokenized economy')}
              <br />
              {t('without wasting time on the technological subtleties.')}
            </p>
            <p>
              {t('Follow the step-by-step procedure and create')}
              <br />
              {t('your token sale instantly.')}
            </p>
            <p>
              {t('With the Tokedo Token Creator you can')}
              <br />
              {t('generate the smart contracts of your token and')}
              <br />
              {t('of your token sale in a matter of minutes.')}
            </p>
          </div>
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
