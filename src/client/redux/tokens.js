import { handleActions, createAction } from 'redux-actions'
import { cloneDeep } from 'lodash'
import prepareReceipt from '../utils/prepareReceipt'

export const saveTransaction = createAction('TOKENS_SAVE_TRANSACTION',
  (txId, token) => {
    return {
      txId,
      token
    }
  }
)

export const saveReceipt = createAction('TOKENS_SAVE_RECEIPT',
  (receipt) => {
    return {
      receipt
    }
  }
)

export const tokens = handleActions({
  TOKENS_SAVE_TRANSACTION: (state, { payload: { txId, token } }) => {
    return { ...state, transactions: {...state.transactions, [txId]: token} }
  },
  TOKENS_SAVE_RECEIPT: (state, { payload: { receipt } }) => {
    const transactions = cloneDeep(state.transactions)
    const transactionHash = receipt.transactionHash
    transactions[transactionHash].contractAddress = receipt.contractAddress
    const preparedReceipt = prepareReceipt(receipt)
    return { ...state, transactions, receipts: { ...state.receipts, [receipt.contractAddress]: preparedReceipt } }
  }
}, {
  transactions: {},
  receipts: {}
})
