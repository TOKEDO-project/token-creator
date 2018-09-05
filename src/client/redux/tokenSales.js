import { handleActions, createAction } from 'redux-actions'
import { cloneDeep } from 'lodash'

export const saveTransaction = createAction('TOKEN_SALES_SAVE_TRANSACTION',
  ({mainTokenSaleAddress, txId, tokenSale}) => {
    return {
      mainTokenSaleAddress,
      txId,
      tokenSale
    }
  }
)

export const saveReceipt = createAction('TOKEN_SALES_SAVE_RECEIPT',
  ({mainTokenSaleAddress, receipt}) => {
    return {
      mainTokenSaleAddress,
      receipt
    }
  }
)

export const tokenSales = handleActions({
  TOKEN_SALES_SAVE_TRANSACTION: (state, { payload: { mainTokenSaleAddress, txId, tokenSale } }) => {
    const mainTokenSale = state[mainTokenSaleAddress]
    const receipts = mainTokenSale ? mainTokenSale.receipts : {}
    const transactions = mainTokenSale ? mainTokenSale.transactions : {}
    return {
      ...state,
      [mainTokenSaleAddress]: {
        receipts,
        transactions: { ...transactions, [txId]: tokenSale }
      }
    }
  },
  TOKEN_SALES_SAVE_RECEIPT: (state, { payload: { mainTokenSaleAddress, receipt } }) => {
    const transactions = cloneDeep(state[mainTokenSaleAddress].transactions)
    const transactionHash = receipt.transactionHash
    transactions[transactionHash].contractAddress = receipt.contractAddress
    return { ...state, [mainTokenSaleAddress]: { transactions, receipts: { ...state[mainTokenSaleAddress].receipts, [receipt.contractAddress]: receipt } } }
  }
}, {})
