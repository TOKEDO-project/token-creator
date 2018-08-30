import { handleActions, createAction } from 'redux-actions'
import { cloneDeep } from 'lodash'

export const saveTransaction = createAction('TOKEN_SALES_SAVE_TRANSACTION',
  (mainTokenSaleAddress, txId, mainTokenSale) => {
    return { [mainTokenSaleAddress]: { [txId]: mainTokenSale } }
  }
)

export const saveReceipt = createAction('TOKEN_SALES_SAVE_RECEIPT',
  (mainTokenSaleAddress, contractAddress, receipt) => {
    return {
      mainTokenSaleAddress,
      contractAddress,
      receipt
    }
  }
)

export const tokenSales = handleActions({
  TOKEN_SALES_SAVE_TRANSACTION: (state, { payload }) => {
    return { ...state, transactions: { ...state.transactions, ...payload } }
  },
  TOKEN_SALES_SAVE_RECEIPT: (state, { payload }) => {
    const transactions = cloneDeep(state.transactions)
    const transactionHash = payload.receipt.transactionHash
    transactions[transactionHash].contractAddress = payload.receipt.contractAddress
    return { ...state, [payload.mainTokenSaleAddress]: { transactions, receipts: { ...state.receipts, [payload.contractAddress]: payload.receipt } } }
  }
}, {})
