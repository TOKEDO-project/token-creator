import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { map } from 'lodash'
import shuttle from '../assets/images/shuttle.svg'
import './Home.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render () {
    const { t, tokens } = this.props
    console.log(tokens)
    if (Object.keys(tokens.receipts).length === 0) {
      return (
        <div id='home' className='pure-u-1 d-flex flex-column flex-h-center flex-v-center'>
          <img className='shuttle' src={shuttle} alt='Home' />
          <span className='message'>Your Token Sale in 5 Minutes</span>
          <a href='/token/add/wizard'>
            <button type='button' className='start-now'>
              {t('START NOW!')}
            </button>
          </a>
        </div>
      )
    }
    return (
      <div>
        {t('List of Token')}
        <div>
          {map(tokens.receipts, (receipt, key) => {
            const transaction = tokens.transactions[receipt.transactionHash]
            if (receipt.contractAddress) {
              return <div key={key}>
                {receipt.contractAddress}<br />{transaction.name} - {transaction.symbol} - {transaction.supply} - {transaction.decimals} - {transaction.type}
                <a href={`/token/details/${receipt.contractAddress}`}><button>details</button></a>
              </div>
            }
          })}
        </div>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(Home))
