import simpleTokenAbi from '../assets/abi/Token-simple.json'
import startableBurnableTokenAbi from '../assets/abi/Token-startable-burnable.json'
import startableTokenAbi from '../assets/abi/Token-startable.json'
import bnUtils from '../../../bnUtils'

export default async ({ web3, tokenType, tokenAddress, to, tokenAmount, tokenDecimals }) => {
  let abi
  switch (tokenType) {
    case 'startable-burnable':
      abi = startableBurnableTokenAbi
      break
    case 'startable':
      abi = startableTokenAbi
      break
    case 'simple':
      abi = simpleTokenAbi
      break
  }
  const contract = new web3.eth.Contract(abi, tokenAddress)
  const tx = await contract.methods.transfer(to, bnUtils.times(tokenAmount, bnUtils.pow(10, tokenDecimals)))
  const gasPrice = await web3.eth.getGasPrice()
  let options = { from: web3.address, gasPrice }
  await tx.estimateGas(options)
  return tx
}
