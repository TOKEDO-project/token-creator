export const getTokenSalesTransactions = ({tokenId, mainTokenSales, tokenSales}) => {
  const mainTokenSale = mainTokenSales[tokenId]
  const mainTokenSaleAddress = mainTokenSale && mainTokenSale.receipt ? mainTokenSale.receipt.contractAddress : null
  const tokenSaleTransactions = mainTokenSaleAddress && tokenSales[mainTokenSaleAddress] ? tokenSales[mainTokenSaleAddress].transactions : []
  return tokenSaleTransactions
}

export const getTokenSaleTimes = (tokenSale) => {
  let startTime = tokenSale.startTime
  let endTime = tokenSale.endTime
  const { startEndTimes } = tokenSale
  if (startEndTimes && startEndTimes.length > 0) {
    startTime = startEndTimes[startEndTimes.length - 1].startTime
    endTime = startEndTimes[startEndTimes.length - 1].endTime
  }
  return { startTime, endTime }
}
