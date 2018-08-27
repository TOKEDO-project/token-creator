const Web3 = require('web3')

const abiEncodePacked = (types, params) => {
  const web3 = new Web3()
  let result = ''
  for (const i in params) {
    let paramHex = ''
    if (types[i] === 'uint256' || types[i] === 'uint8') {
      paramHex = web3.eth.abi.encodeParameter(types[i], params[i])
    } else {
      paramHex = web3.utils.toHex(params[i])
    }
    if (i > 0) {
      paramHex = paramHex.substr(2)
    }
    result += paramHex
  }
  console.log(result)
  return result
}

module.exports = {
  abiEncodePacked
}
