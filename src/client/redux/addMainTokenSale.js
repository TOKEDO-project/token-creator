import { handleActions, createAction } from 'redux-actions'

export const setState = createAction('ADD_MAIN_TOKEN_SALE_SET_STATE',
  ({ tokenAddress, state }) => {
    return {
      tokenAddress,
      state
    }
  }
)

export const setAmount = createAction('ADD_MAIN_TOKEN_SALE_SET_AMOUNT',
  ({ tokenAddress, amount }) => {
    return {
      tokenAddress,
      amount
    }
  }
)

export const addMainTokenSale = handleActions({
  ADD_MAIN_TOKEN_SALE_SET_STATE: (state, { payload }) => {
    const token = state[payload.tokenAddress]
    const amount = token ? token.amount : ''
    if (payload.state === 'initialized' && token.state && token.state !== 'uninitialized') {
      return state
    }
    return {
      ...state,
      [payload.tokenAddress]: {
        amount,
        state: payload.state
      }
    }
  },
  ADD_MAIN_TOKEN_SALE_SET_AMOUNT: (state, { payload }) => {
    return {
      ...state,
      [payload.tokenAddress]: {
        amount: payload.amount,
        state: state[payload.tokenAddress].state
      }
    }
  }
}, {})

// state: 'uninitialized', uninitialized, initialized, deployed, token-transferred, authorized
