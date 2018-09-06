import simpleTokenAbi from '../assets/abi/Token-simple.json'
import startableBurnableTokenAbi from '../assets/abi/Token-startable-burnable.json'
import startableTokenAbi from '../assets/abi/Token-startable.json'

export default async ({ web3, tokenType, tokenAddress, to, tokenAmount }) => {
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
  const tx = await contract.methods.transfer(to, web3.utils.toWei(tokenAmount))
  const gasPrice = await web3.eth.getGasPrice()
  let options = { from: web3.address, gasPrice }
  await tx.estimateGas(options)
  return tx
}
