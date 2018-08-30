import { handleActions, createAction } from 'redux-actions'
import { cloneDeep } from 'lodash'
import prepareReceipt from '../utils/prepareReceipt'

export const saveTransaction = createAction('MAIN_TOKEN_SALES_SAVE_TRANSACTION',
  (tokenAddress, txId, mainTokenSale) => {
    return {
      tokenAddress,
      txId,
      mainTokenSale
    }
  }
)

export const saveReceipt = createAction('MAIN_TOKEN_SALES_SAVE_RECEIPT',
  (tokenAddress, receipt) => {
    return {
      tokenAddress,
      receipt
    }
  }
)

export const mainTokenSales = handleActions({
  MAIN_TOKEN_SALES_SAVE_TRANSACTION: (state, { payload: { tokenAddress, txId, mainTokenSale } }) => {
    const token = state[tokenAddress]
    const transactions = token ? token.transactions : {}
    const receipt = token ? token.receipt : {}
    return {
      ...state,
      [tokenAddress]: {
        transactions: { ...transactions, [txId]: mainTokenSale },
        receipt
      }
    }
  },
  MAIN_TOKEN_SALES_SAVE_RECEIPT: (state, { payload: { tokenAddress, receipt } }) => {
    const transactions = cloneDeep(state[tokenAddress].transactions)
    const transactionHash = receipt.transactionHash
    transactions[transactionHash].contractAddress = receipt.contractAddress
    const preparedReceipt = prepareReceipt(receipt)
    return { ...state, [tokenAddress]: { transactions, receipt: { ...state[tokenAddress].receipt, ...preparedReceipt } } }
  }
}, {})
