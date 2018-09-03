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

export const saveTransferReceipt = createAction('MAIN_TOKEN_SALES_SAVE_TRANSFER_RECEIPT',
  (tokenAddress, tranferReceipt, amount) => {
    return {
      tokenAddress,
      tranferReceipt,
      amount
    }
  }
)

export const saveSetAuthorizedReceipt = createAction('MAIN_TOKEN_SALES_SAVE_SET_AUTHORIZED_RECEIPT',
  (tokenAddress, setAuthorizedReceipt) => {
    return {
      tokenAddress,
      setAuthorizedReceipt
    }
  }
)

export const mainTokenSales = handleActions({
  MAIN_TOKEN_SALES_SAVE_TRANSACTION: (state, { payload: { tokenAddress, txId, mainTokenSale } }) => {
    const token = state[tokenAddress]
    const transactions = token ? token.transactions : {}
    const receipt = token ? token.receipt : {}
    const transferReceipt = token ? token.transferReceipt : {}
    const setAuthorizedReceipt = token ? token.setAuthorizedReceipt : {}
    return {
      ...state,
      [tokenAddress]: {
        transactions: { ...transactions, [txId]: mainTokenSale },
        receipt,
        transferReceipt,
        setAuthorizedReceipt
      }
    }
  },
  MAIN_TOKEN_SALES_SAVE_RECEIPT: (state, { payload: { tokenAddress, receipt } }) => {
    const transactions = cloneDeep(state[tokenAddress].transactions)
    const transactionHash = receipt.transactionHash
    transactions[transactionHash].contractAddress = receipt.contractAddress
    const preparedReceipt = prepareReceipt(receipt)
    return { ...state,
      [tokenAddress]: {
        transactions,
        receipt: preparedReceipt,
        transferReceipt: { ...state[tokenAddress].transferReceipt },
        setAuthorizedReceipt: { ...state[tokenAddress].setAuthorizedReceipt }
      }
    }
  },
  MAIN_TOKEN_SALES_SAVE_TRANSFER_RECEIPT: (state, { payload: { tokenAddress, tranferReceipt, amount } }) => {
    const transactions = cloneDeep(state[tokenAddress].transactions)
    const transactionHash = tranferReceipt.transactionHash
    transactions[transactionHash].amount = amount
    const preparedReceipt = prepareReceipt(tranferReceipt)
    return {
      ...state,
      [tokenAddress]: {
        transactions,
        receipt: { ...state[tokenAddress].receipt },
        transferReceipt: preparedReceipt,
        setAuthorizedReceipt: { ...state[tokenAddress].setAuthorizedReceipt }
      }
    }
  },
  MAIN_TOKEN_SALES_SAVE_SET_AUTHORIZED_RECEIPT: (state, { payload: { tokenAddress, setAuthorizedReceipt } }) => {
    const transactions = cloneDeep(state[tokenAddress].transactions)
    const preparedReceipt = prepareReceipt(setAuthorizedReceipt)
    return {
      ...state,
      [tokenAddress]: {
        transactions,
        receipt: { ...state[tokenAddress].receipt },
        transferReceipt: { ...state[tokenAddress].transferReceipt },
        setAuthorizedReceipt: preparedReceipt
      }
    }
  }

}, {})
