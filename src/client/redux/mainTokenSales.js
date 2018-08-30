import { handleActions, createAction } from 'redux-actions'
import { cloneDeep } from 'lodash'

export const saveTransaction = createAction('SAVE_TRANSACTION',
  (tokenAddress, txId, mainTokenSale) => {
    return { [tokenAddress]: { [txId]: mainTokenSale } }
  }
)

export const saveReceipt = createAction('SAVE_RECEIPT',
  (tokenAddress, contractAddress, receipt) => {
    return {
      tokenAddress,
      contractAddress,
      receipt
    }
  }
)

export const mainTokenSales = handleActions({
  SAVE_TRANSACTION: (state, { payload }) => {
    return { ...state, transactions: { ...state.transactions, ...payload } }
  },
  SAVE_RECEIPT: (state, { payload }) => {
    const transactions = cloneDeep(state.transactions)
    const transactionHash = payload.receipt.transactionHash
    transactions[transactionHash].contractAddress = payload.receipt.contractAddress
    return { ...state, [payload.tokenAddress]: {transactions, receipt: payload.receipt} }
  }
}, {})
