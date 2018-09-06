import { handleActions, createAction } from 'redux-actions'
import { cloneDeep } from 'lodash'
import prepareReceipt from '../utils/prepareReceipt'

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

export const saveAddRCReceipt = createAction('TOKEN_SALES_SAVE_ADD_RC_RECEIPT',
  ({ mainTokenSaleAddress, receipt }) => {
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
    const receiptsAddRC = mainTokenSale ? mainTokenSale.receiptsAddRC : {}
    const transactions = mainTokenSale ? mainTokenSale.transactions : {}
    return {
      ...state,
      [mainTokenSaleAddress]: {
        receipts,
        receiptsAddRC,
        transactions: { ...transactions, [txId]: tokenSale }
      }
    }
  },
  TOKEN_SALES_SAVE_RECEIPT: (state, { payload: { mainTokenSaleAddress, receipt } }) => {
    const transactions = cloneDeep(state[mainTokenSaleAddress].transactions)
    const transactionHash = receipt.transactionHash
    transactions[transactionHash].contractAddress = receipt.contractAddress
    const preparedReceipt = prepareReceipt(receipt)
    return {
      ...state,
      [mainTokenSaleAddress]: {
        transactions,
        receiptsAddRC: state[mainTokenSaleAddress].receiptsAddRC,
        receipts: {
          ...state[mainTokenSaleAddress].receipts,
          [receipt.contractAddress]: preparedReceipt
        }
      }
    }
  },
  TOKEN_SALES_SAVE_ADD_RC_RECEIPT: (state, { payload: { mainTokenSaleAddress, receipt } }) => {
    const preparedReceipt = prepareReceipt(receipt)
    return {
      ...state,
      [mainTokenSaleAddress]: {
        transactions: state[mainTokenSaleAddress].transactions,
        receipts: state[mainTokenSaleAddress].receipts,
        receiptsAddRC: {
          ...state[mainTokenSaleAddress].receiptsAddRC,
          [receipt.contractAddress]: preparedReceipt
        }
      }
    }
  }
}, {})
