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

export const saveTransferTokenTransaction = createAction('TRANSFER_TOKEN_SAVE_TRANSACTION',
  ({ mainTokenSaleAddress, txId, to, amount }) => {
    return {
      mainTokenSaleAddress,
      txId,
      to,
      amount
    }
  }
)

export const saveTransferTokenReceipt = createAction('TRANSFER_TOKEN_SAVE_RECEIPT',
  ({ mainTokenSaleAddress, receipt }) => {
    return {
      mainTokenSaleAddress,
      receipt
    }
  }
)

export const saveRemoveTokenTransaction = createAction('REMOVE_TOKEN_SAVE_TRANSACTION',
  ({ mainTokenSaleAddress, txId, amount }) => {
    return {
      mainTokenSaleAddress,
      txId,
      amount
    }
  }
)

export const saveRemoveTokenReceipt = createAction('REMOVE_TOKEN_SAVE_RECEIPT',
  ({ mainTokenSaleAddress, receipt }) => {
    return {
      mainTokenSaleAddress,
      receipt
    }
  }
)

export const saveUnlockTokenTransaction = createAction('UNLOCK_TOKEN_SAVE_TRANSACTION',
  ({ mainTokenSaleAddress, txId }) => {
    return {
      mainTokenSaleAddress,
      txId
    }
  }
)

export const saveUnlockTokenReceipt = createAction('UNLOCK_TOKEN_SAVE_RECEIPT',
  ({ mainTokenSaleAddress, receipt }) => {
    return {
      mainTokenSaleAddress,
      receipt
    }
  }
)

export const saveAuthorizeTransferTokenTransaction = createAction('AUTHORIZE_TRANSFER_TOKEN_SAVE_TRANSACTION',
  ({ mainTokenSaleAddress, txId, address }) => {
    return {
      mainTokenSaleAddress,
      txId,
      address
    }
  }
)

export const saveAuthorizeTransferTokenReceipt = createAction('AUTHORIZE_TRANSFER_TOKEN_SAVE_RECEIPT',
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
  },
  TRANSFER_TOKEN_SAVE_TRANSACTION: (state, { payload: { mainTokenSaleAddress, txId, amount, to } }) => {
    const mainTokenSale = state['transferToken'] ? state['transferToken'][mainTokenSaleAddress] : null
    const receipts = mainTokenSale ? mainTokenSale.receipts : {}
    const transactions = mainTokenSale ? mainTokenSale.transactions : {}
    return {
      ...state,
      'transferToken': {
        [mainTokenSaleAddress]: {
          receipts,
          transactions: { ...transactions, [txId]: { to, amount } }
        }
      }
    }
  },
  TRANSFER_TOKEN_SAVE_RECEIPT: (state, { payload: { mainTokenSaleAddress, receipt } }) => {
    const transactions = cloneDeep(state['transferToken'][mainTokenSaleAddress].transactions)
    const transactionHash = receipt.transactionHash
    const preparedReceipt = prepareReceipt(receipt)
    return { ...state, 'transferToken': { [mainTokenSaleAddress]: { transactions, receipts: { ...state['transferToken'][mainTokenSaleAddress].receipts, [transactionHash]: preparedReceipt } } } }
  },
  REMOVE_TOKEN_SAVE_TRANSACTION: (state, { payload: { mainTokenSaleAddress, txId, amount } }) => {
    const mainTokenSale = state['removeToken'] ? state['removeToken'][mainTokenSaleAddress] : null
    const receipts = mainTokenSale ? mainTokenSale.receipts : {}
    const transactions = mainTokenSale ? mainTokenSale.transactions : {}
    return {
      ...state,
      'removeToken': {
        [mainTokenSaleAddress]: {
          receipts,
          transactions: { ...transactions, [txId]: { amount } }
        }
      }
    }
  },
  REMOVE_TOKEN_SAVE_RECEIPT: (state, { payload: { mainTokenSaleAddress, receipt } }) => {
    const transactions = cloneDeep(state['removeToken'][mainTokenSaleAddress].transactions)
    const transactionHash = receipt.transactionHash
    const preparedReceipt = prepareReceipt(receipt)
    return { ...state, 'removeToken': { [mainTokenSaleAddress]: { transactions, receipts: { ...state['removeToken'][mainTokenSaleAddress].receipts, [transactionHash]: preparedReceipt } } } }
  },
  UNLOCK_TOKEN_SAVE_TRANSACTION: (state, { payload: { mainTokenSaleAddress, txId } }) => {
    const mainTokenSale = state['unlockToken'] ? state['unlockToken'][mainTokenSaleAddress] : null
    const receipts = mainTokenSale ? mainTokenSale.receipts : {}
    const transactions = mainTokenSale ? mainTokenSale.transactions : {}
    return {
      ...state,
      'unlockToken': {
        [mainTokenSaleAddress]: {
          receipts,
          transactions: { ...transactions, [txId]: 'unlocked' }
        }
      }
    }
  },
  UNLOCK_TOKEN_SAVE_RECEIPT: (state, { payload: { mainTokenSaleAddress, receipt } }) => {
    const transactions = cloneDeep(state['unlockToken'][mainTokenSaleAddress].transactions)
    const transactionHash = receipt.transactionHash
    const preparedReceipt = prepareReceipt(receipt)
    return { ...state, 'unlockToken': { [mainTokenSaleAddress]: { transactions, receipts: { ...state['unlockToken'][mainTokenSaleAddress].receipts, [transactionHash]: preparedReceipt } } } }
  },
  AUTHORIZE_TRANSFER_TOKEN_SAVE_TRANSACTION: (state, { payload: { mainTokenSaleAddress, txId, address } }) => {
    const mainTokenSale = state['authorizeTransferToken'] ? state['authorizeTransferToken'][mainTokenSaleAddress] : null
    const receipts = mainTokenSale ? mainTokenSale.receipts : {}
    const transactions = mainTokenSale ? mainTokenSale.transactions : {}
    return {
      ...state,
      'authorizeTransferToken': {
        [mainTokenSaleAddress]: {
          receipts,
          transactions: { ...transactions, [txId]: { address } }
        }
      }
    }
  },
  AUTHORIZE_TRANSFER_TOKEN_SAVE_RECEIPT: (state, { payload: { mainTokenSaleAddress, receipt } }) => {
    const transactions = cloneDeep(state['authorizeTransferToken'][mainTokenSaleAddress].transactions)
    const transactionHash = receipt.transactionHash
    const preparedReceipt = prepareReceipt(receipt)
    return { ...state, 'authorizeTransferToken': { [mainTokenSaleAddress]: { transactions, receipts: { ...state['authorizeTransferToken'][mainTokenSaleAddress].receipts, [transactionHash]: preparedReceipt } } } }
  }
}, {})
