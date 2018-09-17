import React from 'react'
import './WarningMessage.css'

const WarningMessage = ({ title, description, icon, backgroundColor, shadow }) => {
  return (
    <div className={`warning-message ${shadow ? 'shadow' : ''} pure-u-1  pure-u-sm-1 pure-u-md-1 pure-u-lg-4-5 pure-u-xl-22-24 d-flex flex-column flex-v-center`} style={{ backgroundColor }}>
      <div className='top d-flex flex-row flex-v-center'>
        <span className={`fa fa-${icon}`} />
        <span className='title'>{title}</span>
      </div>
      <span className='description font-size-tiny'>{description}</span>
    </div>
  )
}

export default WarningMessage
