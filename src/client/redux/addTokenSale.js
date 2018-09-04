import { handleActions, createAction } from 'redux-actions'

export const setStep = createAction('TOKEN_SALE_SET_STEP',
  (step) => {
    return step
  }
)

export const setPrice = createAction('TOKEN_SALE_SET_PRICE',
  (price) => {
    return price
  }
)

export const setAmount = createAction('TOKEN_SALE_SET_AMOUNT',
  (amount) => {
    return amount
  }
)

export const setMinContribution = createAction('TOKEN_SALE_SET_MIN_CONTRIBUTION',
  (minContribution) => {
    return minContribution
  }
)

export const setFundOwner = createAction('TOKEN_SALE_SET_OWNER',
  (owner) => {
    return owner
  }
)

export const setStartTime = createAction('TOKEN_SALE_SET_START_TIME',
  (startTime) => {
    return startTime
  }
)

export const setEndTime = createAction('TOKEN_SALE_SET_END_TIME',
  (endTime) => {
    return endTime
  }
)

export const setKYC = createAction('TOKEN_SALE_SET_KYC',
  (kyc) => {
    return kyc
  }
)

export const addTokenSale = handleActions({
  TOKEN_SALE_SET_STEP: (state, { payload }) => {
    return {
      ...state,
      step: payload
    }
  },
  TOKEN_SALE_SET_PRICE: (state, { payload }) => {
    return {
      ...state,
      price: payload
    }
  },
  TOKEN_SALE_SET_AMOUNT: (state, { payload }) => {
    return {
      ...state,
      amount: payload
    }
  },
  TOKEN_SALE_SET_MIN_CONTRIBUTION: (state, { payload }) => {
    return {
      ...state,
      minContribution: payload
    }
  },
  TOKEN_SALE_SET_OWNER: (state, { payload }) => {
    return {
      ...state,
      owner: payload
    }
  },
  TOKEN_SALE_SET_START_TIME: (state, { payload }) => {
    return {
      ...state,
      startTime: payload
    }
  },
  TOKEN_SALE_SET_END_TIME: (state, { payload }) => {
    return {
      ...state,
      endTime: payload
    }
  },
  TOKEN_SALE_SET_KYC: (state, { payload }) => {
    return {
      ...state,
      kyc: payload
    }
  }
}, {
  step: 1,
  price: '',
  amount: '',
  minContribution: '',
  owner: '',
  startTime: '',
  endTime: '',
  kyc: true
})
