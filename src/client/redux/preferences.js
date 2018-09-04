import { handleActions, createAction } from 'redux-actions'

export const setTerms = createAction('SET_TERMS',
  (terms) => {
    return terms
  }
)

export const setTokenMenu = createAction('SET_TOKEN_MENU',
  (showMenu) => {
    return showMenu
  }
)

export const preferences = handleActions({
  SET_TERMS: (state, { payload }) => {
    return {
      ...state,
      terms: payload
    }
  },
  SET_TOKEN_MENU: (state, { payload }) => {
    return {
      ...state,
      showMenu: payload
    }
  }

}, {
  terms: false,
  showMenu: true
})
