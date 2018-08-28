import React, { Component } from 'react'
import AtomaxConnector from 'atomax-connector'
import QRCode from 'qrcode.react'

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
    const { name, to, value } = this.props
    const data = await AtomaxConnector({
      connectorName: name,
      to,
      value,
      addressCB: address => this.setState({ address }),
      txIdCB: tx => this.setState({ txId: tx.id }),
      returnOnlyData: true
    })
    this.setState({ data, loading: false })
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

export default Atomax
