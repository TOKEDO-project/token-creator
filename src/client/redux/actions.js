import { handleActions, createAction } from 'redux-actions'
import { cloneDeep } from 'lodash'
import prepareReceipt from '../utils/prepareReceipt'

export const saveAddMoreTokenTransaction = createAction('ADD_MORE_TOKEN_SAVE_TRANSACTION',
  ({ mainTokenSaleAddress, txId, amount }) => {
    return {
      mainTokenSaleAddress,
      txId,
      amount
    }
  }
)

export const saveAddMoreTokenReceipt = createAction('ADD_MORE_TOKEN_SAVE_RECEIPT',
  ({ mainTokenSaleAddress, receipt }) => {
    return {
      mainTokenSaleAddress,
      receipt
    }
  }
)

export const actions = handleActions({
  ADD_MORE_TOKEN_SAVE_TRANSACTION: (state, { payload: { mainTokenSaleAddress, txId, amount } }) => {
    const mainTokenSale = state['addMoreToken'] ? state['addMoreToken'][mainTokenSaleAddress] : null
    const receipts = mainTokenSale ? mainTokenSale.receipts : {}
    const transactions = mainTokenSale ? mainTokenSale.transactions : {}
    return {
      ...state,
      'addMoreToken': {[mainTokenSaleAddress]: {
        receipts,
        transactions: { ...transactions, [txId]: { amount } }
      }}
    }
  },
  ADD_MORE_TOKEN_SAVE_RECEIPT: (state, { payload: { mainTokenSaleAddress, receipt } }) => {
    const transactions = cloneDeep(state['addMoreToken'][mainTokenSaleAddress].transactions)
    const transactionHash = receipt.transactionHash
    const preparedReceipt = prepareReceipt(receipt)
    return { ...state, 'addMoreToken': { [mainTokenSaleAddress]: { transactions, receipts: { ...state['addMoreToken'][mainTokenSaleAddress].receipts, [transactionHash]: preparedReceipt } } } }
  }
}, {})
