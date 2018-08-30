import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { store } from './redux/store'

import Router from './views/_Router'
import Header from './components/Header'
import Footer from './components/Footer'

import { setWeb3, MetamaskStatus, setMetamaskStatus } from './redux/web3'

import '../../node_modules/purecss/build/pure-min.css'
import '../../node_modules/purecss/build/grids-responsive-min.css'
import './App.css'
import './flex.css'

import i18n from './i18n'
import Loading from './components/Loading'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async componentDidMount () {
    const { dispatch } = this.props
    dispatch(setWeb3(window.web3))
    this.setState({
      loading: false
    })
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  startIntervalMetamask (web3, dispatch) {
    if (!web3.loading && web3.eth) {
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
        <Header />
        {web3.loading ? <Loading /> : <Router />}
        <Footer />
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
