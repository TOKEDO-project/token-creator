import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import persistState from 'redux-localstorage'

import { web3 } from './web3'
import { addToken } from './addToken'
import { addTokenSale } from './addTokenSale'
import { tokens } from './tokens'
import { preferences } from './preferences'

const reducers = combineReducers({
  web3,
  addToken,
  addTokenSale,
  tokens,
  preferences
})

const composeEnhancers = composeWithDevTools({realtime: true, port: 8080})

let enhancers = composeEnhancers(
  applyMiddleware(thunkMiddleware,
    promiseMiddleware()
  ),
  persistState(
    [
      'addToken',
      'tokens',
      'preferences'
    ]
  )
)

if (process.env.NODE_ENV === 'production') {
  enhancers = applyMiddleware(thunkMiddleware, promiseMiddleware(), persistState())
}

export const store = createStore(
  reducers,
  enhancers
)
