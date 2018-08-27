import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { web3 } from './web3'

const reducers = combineReducers({
  web3
})

const composeEnhancers = composeWithDevTools({realtime: true, port: 8080})
let enhancers = composeEnhancers(applyMiddleware(thunkMiddleware, promiseMiddleware()))

if (process.env.NODE_ENV === 'production') {
  enhancers = applyMiddleware(thunkMiddleware, promiseMiddleware())
}

export const store = createStore(
  reducers,
  enhancers
)
