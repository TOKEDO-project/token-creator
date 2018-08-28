import React, { Component } from 'react'
import { MetamaskStatus } from '../../redux/web3'
import { connect } from 'react-redux'

class Metamask extends Component {
  render () {
    const { web3: { metamaskStatus } } = this.props
    console.log(metamaskStatus)
    return (
      <button onClick={this.onClickMetamask} disabled={metamaskStatus === MetamaskStatus.LOCKED || metamaskStatus === MetamaskStatus.NOT_INSTALLED}>
        {metamaskStatus === MetamaskStatus.LOCKED
          ? 'Unlock Metamask'
          : metamaskStatus === MetamaskStatus.NOT_INSTALLED
            ? 'Install Metamask'
            : 'Deploy the token'}
      </button>
    )
  }
}

export default connect(s => s)(Metamask)
