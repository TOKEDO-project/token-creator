import React, { Component } from 'react'
import { MetamaskStatus } from '../../redux/web3'
import { connect } from 'react-redux'

class Metamask extends Component {
  onClickDeploy = async () => {
    const { web3, addToken: { name, symbol, decimals, supply, type } } = this.props
    let abi, bytecode
    switch (type) {
      case 'startable-burnable':
        break
      case 'startable':
        break
      case 'simple':
        break
    }
    const contract = new web3.eth.Contract(abi)
    // TODO: change the name of the button in waiting the transaction
    await contract.deploy({
      data: bytecode,
      arguments: [name, symbol, decimals, supply]
    }).send({
      from: web3.address,
      gas: 1500000,
      gasPrice: 1500000
    })
      .on('error', error => console.log(error))
      .on('transactionHash', transactionHash => console.log(transactionHash))
      .on('receipt', receipt => console.log(receipt.contractAddress)) // contains the new contract address
      .on('confirmation', (confirmationNumber, receipt) => console.log(confirmationNumber, receipt))
  }

  render () {
    const { web3: { metamaskStatus } } = this.props
    return (
      <button onClick={this.onClickDeploy} disabled={metamaskStatus === MetamaskStatus.LOCKED || metamaskStatus === MetamaskStatus.NOT_INSTALLED}>
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
