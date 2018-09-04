import React, { Component } from 'react'
import './WarningMessage.css'

export class WarningMessage extends Component {
  render () {
    const { title, description, icon, backgroundColor, shadow } = this.props
    return (
      <div className={`warning-message ${shadow ? 'shadow' : ''} pure-u-1 pure-u-sm-4-5 pure-u-md-3-5 d-flex flex-column flex-v-center`} style={{ backgroundColor }}>
        <div className='top d-flex flex-row flex-v-center'>
          <span className={`fa fa-${icon}`} />
          <span className='title'>{title}</span>
        </div>
        <span className='description font-size-tiny'>{description}</span>
      </div>
    )
  }
}

export default WarningMessage
