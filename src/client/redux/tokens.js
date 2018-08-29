import { handleActions, createAction } from 'redux-actions'
import { cloneDeep } from 'lodash'

export const saveTransaction = createAction('SAVE_TRANSACTION',
  (txId, token) => {
    return {[txId]: token}
  }
)

export const saveReceipt = createAction('SAVE_RECEIPT',
  (contractAddress, receipt) => {
    return { [contractAddress]: receipt }
  }
)

export const tokens = handleActions({
  SAVE_TRANSACTION: (state, { payload }) => {
    return { ...state, transactions: {...state.transactions, ...payload} }
  },
  SAVE_RECEIPT: (state, { payload }) => {
    const transactions = cloneDeep(state.transactions)
    console.log(payload)
    // transactions[payload.transactionHash].contractAddress = payload.contractAddress
    return { ...state, transactions, receipts: { ...state.receipts, ...payload } }
  }
}, {
  transactions: {},
  receipts: {}
})
