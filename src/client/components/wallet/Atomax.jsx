import React, { Component } from 'react'
import { connect } from 'react-redux'
import AtomaxConnector from 'atomax-connector'
import QRCode from 'qrcode.react'
import './Atomax.css'
import Loading from '../Loading'
import mining from '../../assets/images/mining.svg'
import { translate } from 'react-i18next'

class Atomax extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      address: '',
      txId: '',
      contractAddress: '',
      data: ''
    }
  }
  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  startIntervalAtomax = (txId) => {
    const { web3, onReceipt } = this.props
    if (!web3.loading && web3.eth) {
      this.timer = setInterval(async () => {
        let receipt = await web3.eth.getTransactionReceipt(txId)
        if (receipt) {
          onReceipt(receipt)
          clearTimeout(this.timer)
        }
      }, 3000)
    }
  }

  async componentDidMount () {
    const { transaction, onTransactionHash, connectorName } = this.props
    console.log('transaction--', transaction)
    try {
      const data = await AtomaxConnector({
        connectorName,
        to: '0x0000000000000000000000000000000000000000',
        value: '0',
        gasLimit: '4000000',
        data: transaction.encodeABI(),
        returnOnlyData: true,
        addressCB: address => {
          this.setState({ address })
        },
        txIdCB: tx => {
          console.log('TX', tx)
          this.setState({ txId: tx.id })
          if (tx.id) {
            onTransactionHash(tx.id)
            // Start listening for TX confirmation
            this.startIntervalAtomax(tx.id)
          }
        }
      })
      this.setState({ data, loading: false })
    } catch (error) {
      console.log('[Atomax] prepareAddTokenTransaction error:', error)
    }
  }

  render () {
    const { address, txId, loading, data } = this.state
    const { t } = this.props
    return (
      <div id='atomax' className='pure-u-1'>
        {loading
          ? <Loading size={48} />
          : <div className='d-flex flex-column flex-v-center'>
            <span className='text'>{t(`Scan the QrCode`)} <br />{t(`with ATOMAX wallet`)}</span>
            <QRCode fgColor='#24242A' value={data} />
            <span className='text'>{t(`and send the Transaction`)}</span>
            { address && address !== '' ? <div className='address pure-u-1 d-flex flex-column flex-v-center'>
              <span className='title'>{t(`1. Check your ATOMAX address`)}</span>
              <span className='description'>{t(`Check that this is the same address of your wallet.`)}<br />{t(`Your ATOMAX wallet address is:`)}</span>
              <div className='address-box shadow pure-u-1'>{address}</div>
            </div> : null }
            { txId && txId !== '' ? <div className='transaction pure-u-1 d-flex flex-column flex-v-center'>
              <span className='title'>{t(`2. Send the transaction from your ATOMAX wallet`)}</span>
              <img src={mining} alt='Mining' className='mining' />
              <span className='description italic'>{t(`Wait until the transaction`)} <b>{txId}</b> {t(`is mined`)}</span>
            </div> : null }
          </div>
        }
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(Atomax))
