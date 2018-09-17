import { handleActions, createAction } from 'redux-actions'
import Web3 from 'web3'

export const MetamaskStatus = {
  NOT_INSTALLED: 0,
  LOCKED: 1,
  UNLOCKED: 2
}

export const MetamaskNet = {
  MAINNET: 'main',
  ROPSTEN: 'ropsten',
  PRIVATE: 'private'
}

export const setMetamaskStatus = createAction('SET_METAMASK_STATUS',
  (status) => {
    return status
  }
)

export const setWeb3 = (web3) => async (dispatch, getState) => {
  let metamaskStatus, address, gasPrice
  const infuraProvider = new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER + (process.env.INFURA_TOKEN ? process.env.INFURA_TOKEN : ''))
  if (typeof web3 !== 'undefined') {
    if (web3.currentProvider.isMetaMask === true) {
      web3 = new Web3(window.web3.currentProvider)
      setTimeout(() => {
        web3 = new Web3(infuraProvider)
        if (metamaskStatus === MetamaskStatus.NOT_INSTALLED) {
          return dispatch({
            type: 'SET_WEB3',
            payload: {
              ...web3,
              gasPrice,
              address,
              metamaskStatus: MetamaskStatus.NOT_INSTALLED
            }
          })
        }
      }, 5000)
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
      web3 = new Web3(infuraProvider)
    }
    gasPrice = await web3.eth.getGasPrice()
  } else {
    // No web 3 provider
    metamaskStatus = MetamaskStatus.NOT_INSTALLED
    web3 = new Web3(infuraProvider)
  }

  const metamaskNet = await web3.eth.net.getNetworkType()

  return dispatch({
    type: 'SET_WEB3',
    payload: {
      ...web3,
      gasPrice,
      address,
      metamaskStatus,
      metamaskNet
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
  metamaskNet: MetamaskNet.ROPSTEN,
  metamaskStatus: MetamaskStatus.NOT_INSTALLED,
  address: '',
  loading: true
})
