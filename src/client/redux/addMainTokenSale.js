import { handleActions, createAction } from 'redux-actions'

export const setState = createAction('ADD_MAIN_TOKEN_SALE_SET_STATE',
  (state) => {
    return state
  }
)

export const setAmount = createAction('ADD_MAIN_TOKEN_SALE_SET_AMOUNT',
  (amount) => {
    return amount
  }
)

export const addMainTokenSale = handleActions({
  ADD_MAIN_TOKEN_SALE_SET_STATE: (state, { payload }) => {
    return {
      ...state,
      state: payload
    }
  },
  ADD_MAIN_TOKEN_SALE_SET_AMOUNT: (state, { payload }) => {
    return {
      ...state,
      amount: payload
    }
  }
}, {
  state: 'uninitialized', // uninitialized, initialized, deployed, token-transferred, authorized
  amount: ''
})
