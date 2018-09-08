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

export const pushStartDate = createAction('PUSH_START_END_TIMES_TOKEN_SALE',
  ({ mainTokenSaleAddress, tokenSaleAddress, startTime, endTime }) => {
    return {
      mainTokenSaleAddress,
      tokenSaleAddress,
      startTime,
      endTime
    }
  }
)

export const tokenSales = handleActions({
  PUSH_START_END_TIMES_TOKEN_SALE: (state, { payload: { mainTokenSaleAddress, tokenSaleAddress, startTime, endTime } }) => {
    const transactions = cloneDeep(state[mainTokenSaleAddress].transactions)
    const tokenSaleTxHash = state[mainTokenSaleAddress].receipts[tokenSaleAddress].transactionHash
    const tokenSale = transactions[tokenSaleTxHash]
    tokenSale.startEndTimes.push({ startTime, endTime })
    return {
      ...state,
      [mainTokenSaleAddress]: {
        transactions,
        receiptsAddRC: state[mainTokenSaleAddress].receiptsAddRC,
        receipts: state[mainTokenSaleAddress].receipts
      }
    }
  },
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
        transactions: { ...transactions, [txId]: { ...tokenSale, startEndTimes: [] } }
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
