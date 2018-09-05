import TokenSaleAbi from '../assets/abi/Token-Sale.json'
import TokenSaleBytecode from '../assets/bytecode/Token-Sale.json'
import TokenSaleKycAbi from '../assets/abi/Token-Sale-Kyc.json'
import TokenSaleKycBytecode from '../assets/bytecode/Token-Sale-Kyc.json'
import bnUtils from '../../../bnUtils'

export default async ({ web3, tokenSale, mainTokenSaleAddress, tokenDecimals }) => {
  let abi, bytecode
  if (tokenSale.kyc) {
    abi = TokenSaleKycAbi
    bytecode = TokenSaleKycBytecode
  } else {
    abi = TokenSaleAbi
    bytecode = TokenSaleBytecode
  }

  const contract = new web3.eth.Contract(abi)
  const priceFeed = '0xa035537c2d653fbb82dd268be1961927531bcab4'
  const priceCurrency = ''
  const args = [
    mainTokenSaleAddress,
    bnUtils.times(tokenSale.price, bnUtils.pow(10, tokenDecimals)),
    priceFeed,
    priceCurrency,
    bnUtils.times(tokenSale.amount, bnUtils.pow(10, tokenDecimals)),
    bnUtils.times(tokenSale.minContribution, bnUtils.pow(10, tokenDecimals)),
    tokenSale.startTime,
    tokenSale.endTime
  ]
  const data = '0x' + bytecode.object
  const tx = contract.deploy({
    data,
    arguments: args
  })
  const gasPrice = await web3.eth.getGasPrice()
  let options = { from: web3.address, gasPrice }
  await tx.estimateGas(options)
  return tx
}
