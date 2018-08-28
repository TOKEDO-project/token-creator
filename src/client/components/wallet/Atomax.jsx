import React, { Component } from 'react'
import AtomaxConnector from 'atomax-connector'

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
    const qrcode = await AtomaxConnector({
      connectorName: name,
      to,
      value,
      addressCB: address => this.setState({ address }),
      txIdCB: tx => this.setState({ txId: tx.id }),
      returnOnlyData: true
    })
    this.setState({ qrcode, loading: false })
  }

  render () {
    const { address, txId, data, loading } = this.props
    return (
      <div>
        {loading
          ? <div>Loading</div>
          : <div>
            { data }
            { address && address !== '' ? <div>This is your address: {address}</div> : null }
            { txId && txId !== '' ? <div>This is your transaction id: {txId}</div> : null }
          </div>
        }
      </div>
    )
  }
}

export default Atomax
