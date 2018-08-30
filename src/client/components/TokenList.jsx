import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { map } from 'lodash'

const TokenList = (props) => {
  const { t, tokens } = props
  return (
    <div>
      <div><a href='/token/add/wizard'><button>Create New Token</button></a></div>
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

export default translate('translations')(connect(s => s)(TokenList))
