import React, { Component } from 'react'
import { connect } from 'react-redux'
import AtomaxConnector from 'atomax-connector'
import QRCode from 'qrcode.react'

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
    return (
      <div>
        {loading
          ? <div>Loading</div>
          : <div>
            <QRCode value={data} />
            { address && address !== '' ? <div>This is your address: {address}</div> : null }
            { txId && txId !== '' ? <div>This is your transaction id: {txId}</div> : null }
          </div>
        }
      </div>
    )
  }
}

export default connect(s => s)(Atomax)
