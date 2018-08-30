import { handleActions, createAction } from 'redux-actions'

export const setStep = createAction('SET_STEP',
  (step) => {
    return step
  }
)

export const setPrice = createAction('SET_PRICE',
  (price) => {
    return price
  }
)

export const setAmount = createAction('SET_AMOUNT',
  (amount) => {
    return amount
  }
)

export const setMinContribution = createAction('SET_MIN_CONTRIBUTION',
  (minContribution) => {
    return minContribution
  }
)

export const setFundOwner = createAction('SET_OWNER',
  (owner) => {
    return owner
  }
)

export const setKYC = createAction('SET_KYC',
  (kyc) => {
    return kyc
  }
)

export const addTokenSale = handleActions({
  SET_STEP: (state, { payload }) => {
    return {
      ...state,
      step: payload
    }
  },
  SET_PRICE: (state, { payload }) => {
    return {
      ...state,
      price: payload
    }
  },
  SET_AMOUNT: (state, { payload }) => {
    return {
      ...state,
      amount: payload
    }
  },
  SET_MIN_CONTRIBUTION: (state, { payload }) => {
    return {
      ...state,
      minContribution: payload
    }
  },
  SET_OWNER: (state, { payload }) => {
    return {
      ...state,
      owner: payload
    }
  },
  SET_KYC: (state, { payload }) => {
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
  kyc: true
})
