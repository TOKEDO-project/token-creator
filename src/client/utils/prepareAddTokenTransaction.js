import simpleTokenAbi from '../assets/abi/Token-simple.json'
import simpleTokenBytecode from '../assets/bytecode/Token-simple.json'
import startableBurnableTokenAbi from '../assets/abi/Token-startable-burnable.json'
import startableTokenAbi from '../assets/abi/Token-startable.json'
import startableBurnableTokenBytecode from '../assets/bytecode/Token-startable-burnable.json'
import startableTokenBytecode from '../assets/bytecode/Token-startable.json'
import bnUtils from '../../../bnUtils'

export default async ({ web3, name, symbol, decimals, supply, type }) => {
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
  const contract = new web3.eth.Contract(abi)
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
  const gas = await tx.estimateGas(options)
  options.gas = gas
  return tx
}
