import { handleActions, createAction } from 'redux-actions'
import { cloneDeep } from 'lodash'

export const saveTransaction = createAction('SAVE_TRANSACTION',
  (mainTokenSaleAddress, txId, mainTokenSale) => {
    return { [mainTokenSaleAddress]: { [txId]: mainTokenSale } }
  }
)

export const saveReceipt = createAction('SAVE_RECEIPT',
  (mainTokenSaleAddress, contractAddress, receipt) => {
    return {
      mainTokenSaleAddress,
      contractAddress,
      receipt
    }
  }
)

export const tokenSales = handleActions({
  SAVE_TRANSACTION: (state, { payload }) => {
    return { ...state, transactions: { ...state.transactions, ...payload } }
  },
  SAVE_RECEIPT: (state, { payload }) => {
    const transactions = cloneDeep(state.transactions)
    const transactionHash = payload.receipt.transactionHash
    transactions[transactionHash].contractAddress = payload.receipt.contractAddress
    return { ...state, [payload.mainTokenSaleAddress]: { transactions, receipts: { ...state.receipts, [payload.contractAddress]: payload.receipt } } }
  }
}, {})
