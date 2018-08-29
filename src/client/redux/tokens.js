import { handleActions, createAction } from 'redux-actions'
import { cloneDeep } from 'lodash'

export const saveToken = createAction('SAVE_TOKEN',
  (txId, token) => {
    return {[txId]: token}
  }
)

export const removeToken = createAction('REMOVE_TOKEN',
  (tokenId) => {
    return tokenId
  }
)

export const tokens = handleActions({
  SAVE_TOKEN: (state, { payload }) => {
    return {...state, ...payload}
  },
  REMOVE_TOKEN: (state, { payload }) => {
    const newState = cloneDeep(payload)
    delete newState[payload]
    return newState
  }
}, {})
