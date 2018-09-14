import TokenSaleAbi from '../assets/abi/Token-Sale.json'
import TokenSaleKycAbi from '../assets/abi/Token-Sale-Kyc.json'

export default async ({ web3, hasKYC, tokenSaleAddress, startTime, endTime }) => {
  let abi
  if (hasKYC === 'true') {
    abi = TokenSaleKycAbi
  } else {
    abi = TokenSaleAbi
  }

  const contract = new web3.eth.Contract(abi, tokenSaleAddress)
  const tx = await contract.methods.setTime(Math.round(startTime / 1000), Math.round(endTime / 1000))
  const gasPrice = await web3.eth.getGasPrice()
  let options = { from: web3.address, gasPrice }
  await tx.estimateGas(options)
  return tx
}
