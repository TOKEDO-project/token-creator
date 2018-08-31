export const getTokenInfo = (contractAddress, tokens) => {
  const transactionHash = tokens.receipts[contractAddress].transactionHash
  const tokenInfo = tokens.transactions[transactionHash]
  return tokenInfo
}
