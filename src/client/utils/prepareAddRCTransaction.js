import MainTokenSaleABI from '../assets/abi/Main-Token-Sale.json'

export default async ({ web3, mainTokenSaleAddress, tokenSaleAddress }) => {
  const contract = new web3.eth.Contract(MainTokenSaleABI, mainTokenSaleAddress)
  const tx = await contract.methods.addRC(tokenSaleAddress)
  const gasPrice = await web3.eth.getGasPrice()
  let options = { from: web3.address, gasPrice }
  await tx.estimateGas(options)
  return tx
}
