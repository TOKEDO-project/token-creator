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
        <div id='home' className='pure-u-1 d-flex'>

          <div className='maxContentWidth pure-u-1'>
            <div className='separator pure-u-1 pure-u-sm-1 pure-u-md-6-24 pure-u-lg-6-24 pure-u-xl-1-2' />

            <div className='textHome pure-u-1 pure-u-sm-1 pure-u-md-18-24 pure-u-lg-18-24 pure-u-xl-1-2'>
              <div className='marginTop'>
                <h1 className='message font-size-huge'>{t('YOUR TOKEN SALE NOW!')}</h1>
              </div>

              <div className='marginTop'>
                <p>
                  {t('It’s ')}
                  <span className='spanText'>{t('quick')}</span>,
                  {t(' it’s ')}
                  <span className='spanText'>{t('easy')}</span>.
                </p>

                <p>
                  {t('Generate your ')}<span className='spanText'>{t('token')}</span>{t(' and your ')}
                  <span className='spanText'>{t('token sale')}</span> now,<br />

                  <span className='spanText'>{t('no technical skill')}</span>{t(' needed')}!
                </p>
                <p>
                  {t('Tokenize your company with just a few clicks! ')}
                </p>

              </div>
              <div className='marginTop' >
                <a href='/token/add/wizard'>
                  <button type='button' className='start-now'>
                    {t('START NOW!')}
                  </button>
                </a>
              </div>
            </div>

          </div>

        </div>
      )
    }
    return <TokenList tokens={tokens} />
  }
}

export default translate('translations')(connect(s => s)(Home))
