import { handleActions, createAction } from 'redux-actions'
import moment from 'moment'

const defaultToken = {
  step: 1,
  price: '',
  priceCurrency: '',
  amount: '',
  minContribution: '',
  owner: '',
  startTime: moment().valueOf() + '',
  endTime: moment().add(1, 'month').valueOf() + '',
  kyc: 'true'
}

export const setStep = createAction('TOKEN_SALE_SET_STEP',
  ({ tokenAddress, step }) => {
    return {
      tokenAddress,
      step
    }
  }
)

export const setPrice = createAction('TOKEN_SALE_SET_PRICE',
  ({ tokenAddress, price }) => {
    return {
      tokenAddress,
      price
    }
  }
)

export const setPriceCurrency = createAction('TOKEN_SALE_SET_PRICE_CURRENCY',
  ({ tokenAddress, priceCurrency }) => {
    return {
      tokenAddress,
      priceCurrency
    }
  }
)

export const setAmount = createAction('TOKEN_SALE_SET_AMOUNT',
  ({ tokenAddress, amount }) => {
    return {
      tokenAddress,
      amount
    }
  }
)

export const setMinContribution = createAction('TOKEN_SALE_SET_MIN_CONTRIBUTION',
  ({ tokenAddress, minContribution }) => {
    return {
      tokenAddress,
      minContribution
    }
  }
)

export const setFundOwner = createAction('TOKEN_SALE_SET_OWNER',
  ({ tokenAddress, owner }) => {
    return {
      tokenAddress,
      owner
    }
  }
)

export const setStartTime = createAction('TOKEN_SALE_SET_START_TIME',
  ({ tokenAddress, startTime }) => {
    return {
      tokenAddress,
      startTime
    }
  }
)

export const setEndTime = createAction('TOKEN_SALE_SET_END_TIME',
  ({ tokenAddress, endTime }) => {
    return {
      tokenAddress,
      endTime
    }
  }
)

export const setKYC = createAction('TOKEN_SALE_SET_KYC',
  ({ tokenAddress, kyc }) => {
    return {
      tokenAddress,
      kyc
    }
  }
)

export const reset = createAction('RESET_ADD_TOKEN_SALE',
  ({ tokenAddress }) => {
    return {
      tokenAddress
    }
  }
)

export const addTokenSale = handleActions({
  TOKEN_SALE_SET_STEP: (state, { payload }) => {
    const token = state[payload.tokenAddress] || defaultToken
    return {
      ...state,
      [payload.tokenAddress]: {
        ...token,
        step: payload.step
      }
    }
  },
  TOKEN_SALE_SET_PRICE: (state, { payload }) => {
    const token = state[payload.tokenAddress] || defaultToken
    return {
      ...state,
      [payload.tokenAddress]: {
        ...token,
        price: payload.price
      }
    }
  },
  TOKEN_SALE_SET_PRICE_CURRENCY: (state, { payload }) => {
    const token = state[payload.tokenAddress] || defaultToken
    return {
      ...state,
      [payload.tokenAddress]: {
        ...token,
        priceCurrency: payload.priceCurrency
      }
    }
  },
  TOKEN_SALE_SET_AMOUNT: (state, { payload }) => {
    const token = state[payload.tokenAddress] || defaultToken
    return {
      ...state,
      [payload.tokenAddress]: {
        ...token,
        amount: payload.amount
      }
    }
  },
  TOKEN_SALE_SET_MIN_CONTRIBUTION: (state, { payload }) => {
    const token = state[payload.tokenAddress] || defaultToken
    return {
      ...state,
      [payload.tokenAddress]: {
        ...token,
        minContribution: payload.minContribution
      }
    }
  },
  TOKEN_SALE_SET_OWNER: (state, { payload }) => {
    const token = state[payload.tokenAddress] || defaultToken
    return {
      ...state,
      [payload.tokenAddress]: {
        ...token,
        owner: payload.owner
      }
    }
  },
  TOKEN_SALE_SET_START_TIME: (state, { payload }) => {
    const token = state[payload.tokenAddress] || defaultToken
    return {
      ...state,
      [payload.tokenAddress]: {
        ...token,
        startTime: payload.startTime
      }
    }
  },
  TOKEN_SALE_SET_END_TIME: (state, { payload }) => {
    const token = state[payload.tokenAddress] || defaultToken
    return {
      ...state,
      [payload.tokenAddress]: {
        ...token,
        endTime: payload.endTime
      }
    }
  },
  TOKEN_SALE_SET_KYC: (state, { payload }) => {
    const token = state[payload.tokenAddress] || defaultToken
    return {
      ...state,
      [payload.tokenAddress]: {
        ...token,
        kyc: payload.kyc
      }
    }
  },
  RESET_ADD_TOKEN_SALE: (state, { payload }) => {
    return {
      ...state,
      [payload.tokenAddress]: defaultToken
    }
  }
}, {})
