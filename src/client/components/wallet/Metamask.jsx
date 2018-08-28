import React, { Component } from 'react'
import { MetamaskStatus } from '../../redux/web3'
import { connect } from 'react-redux'
import simpleTokenAbi from '../../assets/abi/Token-simple.json'
import simpleTokenBytecode from '../../assets/bytecode/Token-simple.json'
import startableBurnableTokenAbi from '../../assets/abi/Token-startable-burnable.json'
import startableTokenAbi from '../../assets/abi/Token-startable.json'
import startableBurnableTokenBytecode from '../../assets/bytecode/Token-startable-burnable.json'
import startableTokenBytecode from '../../assets/bytecode/Token-startable.json'
import bnUtils from '../../../../bnUtils'

class Metamask extends Component {
  onClickDeploy = async () => {
    const { web3, addToken: { name, symbol, decimals, supply, type } } = this.props
    let abi, bytecode
    switch (type) {
      case 'startable-burnable':
        abi = startableBurnableTokenAbi
        bytecode = startableBurnableTokenBytecode
        break
      case 'startable':
        abi = startableTokenAbi
        bytecode = startableTokenBytecode
        break
      case 'simple':
        abi = simpleTokenAbi
        bytecode = simpleTokenBytecode
        break
    }
    try {
      const contract = new web3.eth.Contract(abi)
      // TODO: change the name of the button in waiting the transaction
      const args = [
        name,
        symbol,
        parseInt(decimals),
        bnUtils.times(supply, bnUtils.pow(10, decimals))
      ]
      const data = '0x' + bytecode.object
      const tx = contract.deploy({
        data,
        arguments: args
      })
      const gasPrice = await web3.eth.getGasPrice()
      let options = { from: web3.address, gasPrice }
      console.log(args)
      const gas = await tx.estimateGas(options)
      options.gas = gas
      /*
        TODO: give the possibility to avoid the nonce override:
        const nonce = await web3.eth.getTransactionCount(wallet.address, 'pending')
        const trx = { to: 0x0, from: web3.address, value: '0', data: abi, gas: bnUtils.times(gas, 2), nonce, gasPrice }
        await web3.eth.sendTransaction(trx)
      */
      await tx.send(options)
        .on('error', error => console.log(error))
        .on('transactionHash', transactionHash => console.log(transactionHash))
        .on('receipt', receipt => console.log(receipt.contractAddress)) // contains the new contract address
        .on('confirmation', (confirmationNumber, receipt) => console.log(confirmationNumber, receipt))
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
