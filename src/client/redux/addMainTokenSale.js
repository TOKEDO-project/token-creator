import { handleActions, createAction } from 'redux-actions'

export const setInitialized = createAction('SET_INITIALIZED',
  (initialized) => {
    return initialized
  }
)

export const addMainTokenSale = handleActions({
  SET_INITIALIZED: (state, { payload }) => {
    console.log('SET INITIALIZED:', payload)
    return {
      ...state,
      initialized: payload
    }
  }
}, {
  initialized: false
})
