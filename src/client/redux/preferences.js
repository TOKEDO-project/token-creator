import { handleActions, createAction } from 'redux-actions'

export const setTerms = createAction('SET_TERMS',
  (terms) => {
    return terms
  }
)

export const preferences = handleActions({
  SET_TERMS: (state, { payload }) => {
    return {
      ...state,
      terms: payload
    }
  }
}, {
  terms: false
})
