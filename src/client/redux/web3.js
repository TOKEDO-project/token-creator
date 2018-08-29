import { handleActions, createAction } from 'redux-actions'
import Web3 from 'web3'

export const MetamaskStatus = {
  NOT_INSTALLED: 0,
  LOCKED: 1,
  UNLOCKED: 2
}

export const setMetamaskStatus = createAction('SET_METAMASK_STATUS',
  (status) => {
    return status
  }
)

export const setWeb3 = (web3) => async (dispatch, getState) => {
  let metamaskStatus, address, gasPrice
  if (typeof web3 !== 'undefined') {
    if (web3.currentProvider.isMetaMask === true) {
      web3 = new Web3(window.web3.currentProvider)
      const accounts = await web3.eth.getAccounts()
      if (accounts.length === 0) {
        // there is no active accounts in MetaMask
        metamaskStatus = MetamaskStatus.LOCKED
      } else {
        // It's ok
        address = accounts[0]
        metamaskStatus = MetamaskStatus.UNLOCKED
      }
    } else {
      // Another web3 provider
      metamaskStatus = MetamaskStatus.NOT_INSTALLED
      web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/aib8mgqOiU19DKPuRc72'))
    }
    gasPrice = await web3.eth.getGasPrice()
  } else {
    // No web 3 provider
    metamaskStatus = MetamaskStatus.NOT_INSTALLED
    web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/aib8mgqOiU19DKPuRc72'))
  }

  return dispatch({
    type: 'SET_WEB3',
    payload: {
      ...web3,
      gasPrice,
      address,
      metamaskStatus
    }
  })
}

export const web3 = handleActions({
  SET_METAMASK_STATUS: (state, { payload }) => {
    return {
      ...state,
      metamaskStatus: payload
    }
  },
  SET_WEB3: (state, { payload }) => {
    return {
      loading: false,
      ...payload
    }
  }
}, {
  web3: null,
  metamaskStatus: '',
  address: '',
  loading: true
})
