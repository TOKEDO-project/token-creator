import React, { Component } from 'react'

class DateInput extends Component {
  render () {
    const { onClick, value } = this.props
    return (
      <div className='inputBox white-bg d-flex flex-v-center' onClick={onClick}>{value}</div>
    )
  }
}

export default DateInput
