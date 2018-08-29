export default (receipt) => {
  return {
    transactionHash: receipt.transactionHash,
    blockHash: receipt.blockHash,
    blockNumber: receipt.blockNumber,
    contractAddress: receipt.contractAddress,
    cumulativeGasUsed: receipt.cumulativeGasUsed,
    from: receipt.from,
    gasUsed: receipt.gasUsed,
    status: receipt.status,
    to: receipt.to
  }
}
