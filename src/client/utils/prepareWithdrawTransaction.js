import MainTokenSaleABI from '../assets/abi/Main-Token-Sale.json'
import bnUtils from '../../../bnUtils'

export default async ({ web3, mainTokenSaleAddress, to, amount, decimals }) => {
  const contract = new web3.eth.Contract(MainTokenSaleABI, mainTokenSaleAddress)
  const tx = await contract.methods.withdrawTokens(to, bnUtils.times(amount, bnUtils.pow(10, decimals)))
  const gasPrice = await web3.eth.getGasPrice()
  let options = { from: web3.address, gasPrice }
  await tx.estimateGas(options)
  return tx
}
