import React, { Component } from 'react'
import { connect } from 'react-redux'
import AtomaxConnector from 'atomax-connector'
import QRCode from 'qrcode.react'
import prepareTokenReceipt from '../../utils/prepareTokenReceipt'

import { saveTransaction, saveReceipt } from '../../redux/tokens'

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

  startIntervalAtomax = (web3, dispatch, txId, tokenObj) => {
    if (!web3.loading && web3.eth) {
      this.timer = setInterval(async () => {
        let receipt = await web3.eth.getTransactionReceipt(txId)
        if (receipt) {
          const receiptPrepared = prepareTokenReceipt(receipt)
          const contractAddress = receiptPrepared.contractAddress

          clearTimeout(this.timer)

          // write Receipt to store
          const { dispatch } = this.props
          dispatch(saveReceipt(contractAddress, { ...receiptPrepared }))
          this.props.getContractAddress(contractAddress)
        }
      }, 3000)
    }
  }

  async componentDidMount () {
    const { web3, addToken: { name, symbol, decimals, supply, type }, transaction, onTransactionHash } = this.props
    let tokenObj = {
      name,
      symbol,
      decimals,
      supply,
      type
    }
    try {
      const data = await AtomaxConnector({
        connectorName: name,
        to: '0x0000000000000000000000000000000000000000',
        value: '0',
        data: transaction.encodeABI(),
        returnOnlyData: true,
        addressCB: address => {
          this.setState({ address })
        },
        txIdCB: tx => {
          console.log('TX', tx)
          this.setState({ txId: tx.id })
          const { dispatch } = this.props
          if (tx.id) {
            onTransactionHash(tx.id)
            // dispatch(saveTransaction(tx.id, tokenObj))
            // Start listening for TX confirmation
            this.startIntervalAtomax(web3, dispatch, tx.id, tokenObj)
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
