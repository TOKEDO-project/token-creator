import React from 'react'
import { connect } from 'react-redux'

import './TokenDetails.css'
import PageNotFound from '../components/PageNotFound'

const TokenDetails = (props) => {
  const { match: { params: { tokenId } }, tokens: { transactions, receipts } } = props
  // Get token receipt
  const receipt = receipts[tokenId]

  if (!receipt) {
    return (
      <PageNotFound />
    )
  }

  // Get token details
  const tokenDetails = transactions[receipt.transactionHash]
  console.log('receipt', receipt, 'tokenDetails', tokenDetails)
  return (
    <div>
      <div id='TokenDetails'>
        <button>back</button>
        <div>Token Address: {tokenId}</div>
        <div>Token Owner: {receipt.owner}</div>
        {tokenDetails.name} - {tokenDetails.symbol} - {tokenDetails.supply}
        - {tokenDetails.decimals} - {tokenDetails.type}
      </div>
    </div>
  )
}

export default connect(s => s)(TokenDetails)
