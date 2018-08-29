import simpleTokenAbi from '../assets/abi/Token-simple.json'
import simpleTokenBytecode from '../assets/bytecode/Token-simple.json'
import startableBurnableTokenAbi from '../assets/abi/Token-startable-burnable.json'
import startableTokenAbi from '../assets/abi/Token-startable.json'
import startableBurnableTokenBytecode from '../assets/bytecode/Token-startable-burnable.json'
import startableTokenBytecode from '../assets/bytecode/Token-startable.json'
import bnUtils from '../../../bnUtils'

export default async ({ web3, addToken }) => {
  let abi, bytecode
  switch (addToken.type) {
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
    addToken.name,
    addToken.symbol,
    parseInt(addToken.decimals),
    bnUtils.times(addToken.supply, bnUtils.pow(10, addToken.decimals))
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
