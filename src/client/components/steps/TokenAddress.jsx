import React, { Component } from 'react'
import { connect } from 'react-redux'

class TokenAddress extends Component {
  render () {
    const { contractAddress } = this.props
    return (
      <div id='ContractAddress'>
        <h1>Contract created!</h1>
        {contractAddress} <button>copy</button>
        <div>
          <a href='/'>Close</a>
          <a href={`/token/details/${contractAddress}`}>Deploy Token Sale</a>
        </div>
      </div>
    )
  }
}

export default connect(s => s)(TokenAddress)
