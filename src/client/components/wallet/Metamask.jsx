import React, { Component } from 'react'
import { MetamaskStatus } from '../../redux/web3'
import { connect } from 'react-redux'

class Metamask extends Component {
  onClickDeploy = async () => {
    const { web3, transaction, onTransactionHash, onReceipt } = this.props

    // TODO: change the name of the button in waiting the transaction
    try {
      /*
        TODO: give the possibility to avoid the nonce override:
        const nonce = await web3.eth.getTransactionCount(wallet.address, 'pending')
        const trx = { to: 0x0, from: web3.address, value: '0', data: abi, gas: bnUtils.times(gas, 2), nonce, gasPrice }
        await web3.eth.sendTransaction(trx)
      */
      const gasPrice = await web3.eth.getGasPrice()

      console.log('TX: ', transaction)

      await transaction.send({from: web3.address, gasPrice})
        .on('error', error => console.log(error))
        .on('transactionHash', transactionHash => {
          console.log(transactionHash)
          onTransactionHash(transactionHash)
        })
        .on('receipt', receipt => {
          console.log('METAMASK:', receipt)
          onReceipt(receipt)
        })
        .on('confirmation', (confirmationNumber, receipt) => console.log(confirmationNumber))
    } catch (error) {
      console.log(error)
    }
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
