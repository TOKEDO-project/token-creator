import { handleActions, createAction } from 'redux-actions'

export const saveToken = createAction('SAVE_TOKEN',
  (txId, token) => {
    return {[txId]: token}
  }
)

export const tokens = handleActions({
  SAVE_TOKEN: (state, { payload }) => {
    return {...state, ...payload}
  }
}, {})
