import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setStep } from '../../redux/addToken'

class ResetAndBack extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  goBack = (e) => {
    const { dispatch } = this.props
    dispatch(setStep(1))
  }
  doReset = (e) => {
    console.log('doReset')
  }
  render () {
    return (
      <div>
        <button onClick={this.goBack}>Go Back</button>
        <button onClick={this.doReset}>Reset</button>
      </div>
    )
  }
}

export default connect(s => s)(ResetAndBack)
