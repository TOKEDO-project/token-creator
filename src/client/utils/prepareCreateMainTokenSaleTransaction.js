import MainTokenSaleABI from '../assets/abi/Main-Token-Sale.json'
import MainTokenSaleBytecode from '../assets/bytecode/Main-Token-Sale.json'

export default async ({ web3, addMainTokenSale }) => {
  const contract = new web3.eth.Contract(MainTokenSaleABI)
  const args = [
    addMainTokenSale.userAddress, // address of the token owner
    addMainTokenSale.tokenAddress // address of the token to sell
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
