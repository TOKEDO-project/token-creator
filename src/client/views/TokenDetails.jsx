import React, { Component } from 'react'
import { connect } from 'react-redux'

class TokenDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render () {
    return (<div>
      TokenDetails
      <div>
      Lista dei token
      </div>
    </div>)
  }
}

export default connect(s => s)(TokenDetails)
