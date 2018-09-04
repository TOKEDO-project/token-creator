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
  (mainTokenSaleAddress, contractAddress, receipt) => {
    return {
      mainTokenSaleAddress,
      contractAddress,
      receipt
    }
  }
)

export const tokenSales = handleActions({
  TOKEN_SALES_SAVE_TRANSACTION: (state, { payload: { mainTokenSaleAddress, txId, tokenSale } }) => {
    const receipts = state[mainTokenSaleAddress].receipts
    const transactions = state[mainTokenSaleAddress].transactions
    return {
      ...state,
      [mainTokenSaleAddress]: {
        receipts,
        transactions: { ...transactions, [txId]: tokenSale }
      }
    }
  },
  TOKEN_SALES_SAVE_RECEIPT: (state, { payload }) => {
    const transactions = cloneDeep(state.transactions)
    const transactionHash = payload.receipt.transactionHash
    transactions[transactionHash].contractAddress = payload.receipt.contractAddress
    return { ...state, [payload.mainTokenSaleAddress]: { transactions, receipts: { ...state.receipts, [payload.contractAddress]: payload.receipt } } }
  }
}, {})
