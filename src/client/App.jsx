import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { store } from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './views/_Routes'
import Header from './components/Header'
import Footer from './components/Footer'

import { setWeb3, MetamaskStatus, setMetamaskStatus } from './redux/web3'
import { saveReceipt } from './redux/tokens'

import '../../node_modules/purecss/build/pure-min.css'
import '../../node_modules/purecss/build/grids-responsive-min.css'
import './App.css'
import './flex.css'
import './text.css'

import i18n from './i18n'
import Loading from './components/Loading'
import SwitchNetwork from './components/modals/SwitchNetwork'

class App extends React.Component {
  async componentDidMount () {
    const { dispatch } = this.props
    await dispatch(setWeb3(window.web3))
    this.startRecoveryTransactions()
  }

  startRecoveryTransactions = () => {
    const { tokens, dispatch } = this.props
    const transactions = tokens.transactions

    // Tokens transactions
    const txs = []
    for (const txId in transactions) {
      if (transactions[txId].status === undefined) {
        txs.push({ txId, onReceipt: (receipt) => dispatch(saveReceipt(receipt)) })
      }
    }

    // Main Token Sales transactions

    // Token Sales transactions

    // Other transactions

    if (txs.length > 0) {
      this.startIntervalTransaction(txs)
    }
  }

  startIntervalTransaction = (txs) => {
    const { web3 } = this.props
    if (!web3.loading && web3.eth) {
      this.timer = setTimeout(async () => {
        const newTxs = []
        for (const tx of txs) {
          console.log('CHECKING TX FOR RECEIPT:', tx.txId)
          let receipt = await web3.eth.getTransactionReceipt(tx.txId)
          if (receipt) {
            console.log('RECEIPT RECEIVED FOR:', tx.txId)
            tx.onReceipt(receipt)
          } else {
            newTxs.push(tx)
          }
        }

        if (newTxs.length > 0) {
          this.startIntervalTransaction(newTxs)
        }
      }, 3000)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  startIntervalMetamask (web3, dispatch) {
    if (!web3.loading && web3.eth && web3.metamaskStatus !== MetamaskStatus.NOT_INSTALLED) {
      this.timer = setInterval(async () => {
        const accounts = await web3.eth.getAccounts()
        // Detect address change
        if (accounts[0] !== web3.address) {
          window.location.reload()
        }
        if (accounts.length === 0) {
          // there is no active accounts in MetaMask
          if (web3.metamaskStatus !== MetamaskStatus.LOCKED) {
            dispatch(setMetamaskStatus(MetamaskStatus.LOCKED))
          }
        } else {
          // It's ok
          if (web3.metamaskStatus !== MetamaskStatus.UNLOCKED) {
            dispatch(setMetamaskStatus(MetamaskStatus.UNLOCKED))
          }
        }
      }, 3000)
    }
  }

  render () {
    const { web3, dispatch } = this.props
    if (!this.timer && web3 !== null) {
      this.startIntervalMetamask(web3, dispatch)
    }

    return (
      <div className='pure-g'>
        <Router >
          <div className='pure-u-1'>
            <Header />
            {web3.loading ? <Loading isView /> : <Routes />}
            {web3.metamaskNet !== process.env.NET && process.env.NODE_ENV !== 'development' ? <SwitchNetwork /> : null}
            <Footer />
          </div>
        </Router>
      </div>
    )
  }
}

const AppConnected = connect(s => s)(App)

render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <AppConnected />
    </I18nextProvider>
  </Provider>, document.getElementById('app'))
