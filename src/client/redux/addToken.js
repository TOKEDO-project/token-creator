import { handleActions, createAction } from 'redux-actions'

export const addAddress = createAction('ADD_ADDRESS',
  (address) => {
    return address
  }
)
export const setStep = createAction('SET_STEP',
  (step) => {
    return step
  }
)

export const setName = createAction('SET_NAME',
  (name) => {
    return name
  }
)

export const setSymbol = createAction('SET_SYMBOL',
  (symbol) => {
    return symbol
  }
)

export const setDecimals = createAction('SET_DECIMALS',
  (decimals) => {
    return decimals
  }
)

export const setSupply = createAction('SET_SUPPLY',
  (supply) => {
    return supply
  }
)

export const setType = createAction('SET_TYPE',
  (type) => {
    return type
  }
)

export const setWalletType = createAction('SET_WALLET_TYPE',
  (walletType) => {
    return walletType
  }
)

export const reset = createAction('RESET_ADD_TOKEN')

export const addToken = handleActions({
  ADD_ADDRESS: (state, { payload }) => {
    return {
      ...state,
      addresses: [...state.addresses, payload]
    }
  },
  SET_STEP: (state, { payload }) => {
    return {
      ...state,
      step: payload
    }
  },
  SET_NAME: (state, { payload }) => {
    return {
      ...state,
      name: payload
    }
  },
  SET_SYMBOL: (state, { payload }) => {
    return {
      ...state,
      symbol: payload
    }
  },
  SET_DECIMALS: (state, { payload }) => {
    return {
      ...state,
      decimals: payload
    }
  },
  SET_SUPPLY: (state, { payload }) => {
    return {
      ...state,
      supply: payload
    }
  },
  SET_TYPE: (state, { payload }) => {
    return {
      ...state,
      type: payload
    }
  },
  SET_WALLET_TYPE: (state, { payload }) => {
    return {
      ...state,
      walletType: payload
    }
  },
  RESET_ADD_TOKEN: () => {
    console.log('RESET_ADD_TOKEN')
    return {
      step: 1,
      name: '',
      symbol: '',
      decimals: 18,
      supply: '',
      type: 'startable-burnable',
      walletType: 'metamask'
    }
  }
}, {
  step: 1,
  name: '',
  symbol: '',
  decimals: 18,
  supply: '',
  type: 'startable-burnable',
  walletType: 'metamask'
})
