import MainTokenSaleABI from '../assets/abi/Token-simple.json'
import MainTokenSaleBytecode from '../assets/bytecode/Token-simple.json'

export default async ({ web3, addMainTokenSale }) => {
  const contract = new web3.eth.Contract(MainTokenSaleABI)
  const args = [
    addMainTokenSale.userAddress,
    addMainTokenSale.tokenAddress
  ]
  const data = '0x' + MainTokenSaleBytecode.object
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
