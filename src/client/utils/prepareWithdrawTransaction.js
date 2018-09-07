import MainTokenSaleABI from '../assets/abi/Main-Token-Sale.json'

export default async ({ web3, mainTokenSaleAddress, to, amount }) => {
  const contract = new web3.eth.Contract(MainTokenSaleABI, mainTokenSaleAddress)
  const tx = await contract.methods.withdrawTokens(to, amount)
  const gasPrice = await web3.eth.getGasPrice()
  let options = { from: web3.address, gasPrice }
  await tx.estimateGas(options)
  return tx
}
