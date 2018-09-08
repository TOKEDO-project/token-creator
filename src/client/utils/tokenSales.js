export const getTokenSalesTransactions = ({tokenId, mainTokenSales, tokenSales}) => {
  const mainTokenSale = mainTokenSales[tokenId]
  const mainTokenSaleAddress = mainTokenSale && mainTokenSale.receipt ? mainTokenSale.receipt.contractAddress : null
  const tokenSaleTransactions = mainTokenSaleAddress && tokenSales[mainTokenSaleAddress] ? tokenSales[mainTokenSaleAddress].transactions : []
  return tokenSaleTransactions
}
