import React, { Component } from 'react'
import { connect } from 'react-redux'
import AtomaxConnector from 'atomax-connector'
import QRCode from 'qrcode.react'
import prepareAddTokenTransaction from '../../utils/prepareAddTokenTransaction'
import prepareTokenReceipt from '../../utils/prepareTokenReceipt'

import { saveToken } from '../../redux/tokens'

class Atomax extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      address: '',
      txId: '',
      data: ''
    }
  }

  async componentDidMount () {
    const { web3, addToken: { name, symbol, decimals, supply, type } } = this.props
    let tokenObj = {
      name,
      symbol,
      decimals,
      supply,
      type
    }
    try {
      const tx = await prepareAddTokenTransaction({web3, name, symbol, decimals, supply, type})
      const data = await AtomaxConnector({
        connectorName: name,
        to: '0x0000000000000000000000000000000000000000',
        value: '0',
        data: tx.encodeABI(),
        returnOnlyData: true,
        addressCB: address => {
          this.setState({ address })
        },
        txIdCB: tx => {
          this.setState({ txId: tx.id })
          const { dispatch } = this.props
          dispatch(saveToken(tx.id, tokenObj))
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
