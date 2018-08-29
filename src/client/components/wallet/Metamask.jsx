import React, { Component } from 'react'
import { MetamaskStatus } from '../../redux/web3'
import { connect } from 'react-redux'
import prepareAddTokenTransaction from '../../utils/prepareAddTokenTransaction'
import prepareTokenReceipt from '../../utils/prepareTokenReceipt'

import { saveToken } from '../../redux/tokens'

class Metamask extends Component {
  onClickDeploy = async () => {
    const { web3, addToken: { name, symbol, decimals, supply, type } } = this.props

    // TODO: change the name of the button in waiting the transaction
    try {
      const tx = await prepareAddTokenTransaction({web3, name, symbol, decimals, supply, type})
      /*
        TODO: give the possibility to avoid the nonce override:
        const nonce = await web3.eth.getTransactionCount(wallet.address, 'pending')
        const trx = { to: 0x0, from: web3.address, value: '0', data: abi, gas: bnUtils.times(gas, 2), nonce, gasPrice }
        await web3.eth.sendTransaction(trx)
      */
      const gasPrice = await web3.eth.getGasPrice()
      let tokenObj = {
        name,
        symbol,
        decimals,
        supply,
        type
      }

      console.log('TX: ', tx)

      await tx.send({from: web3.address, gasPrice})
        .on('error', error => console.log(error))
        .on('transactionHash', transactionHash => {
          console.log(transactionHash)

          const { dispatch } = this.props
          dispatch(saveToken(transactionHash, tokenObj))
        })
        .on('receipt', receipt => {
          const { dispatch } = this.props
          const receiptPrepared = prepareTokenReceipt(receipt)
          const contractAddress = receiptPrepared.contractAddress

          // write Receipt to store
          dispatch(saveToken(contractAddress, { ...receiptPrepared }))
          this.props.getContractAddress(contractAddress)
        })
        .on('confirmation', (confirmationNumber, receipt) => console.log(confirmationNumber, prepareTokenReceipt(receipt)))
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
