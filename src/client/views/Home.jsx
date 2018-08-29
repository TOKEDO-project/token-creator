import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'

import { map } from 'lodash'

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
      return (<div> {t('Home')} <div><a href='/token/add/wizard'>{t('START NOW!')}</a></div> </div>)
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
                <a href={`/token/details/${receipt.contractAddress}`}>details</a>
              </div>
            }
          })}
        </div>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(Home))
