import React, { Component } from 'react'
import { connect } from 'react-redux'

import './TokenDetails.css'

class TokenDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  componentDidMount () {

  }

  render () {
    const { match: {params: {tokenId}}, tokens } = this.props
    // Get token receipt
    const token = tokens[tokenId]
    // Get token details
    const tokenDetails = tokens[token.transactionHash]
    console.log('token', token, 'tokenDetails', tokenDetails)

    return (<div>
      <div id='TokenDetails'>
        <button>back</button>
        <div>Token Address: {tokenId}</div>
        <div>Token Owner: {token.owner}</div>
        {tokenDetails.name} - {tokenDetails.symbol} - {tokenDetails.supply}
         - {tokenDetails.decimals} - {tokenDetails.type}
      </div>
    </div>)
  }
}

export default connect(s => s)(TokenDetails)
