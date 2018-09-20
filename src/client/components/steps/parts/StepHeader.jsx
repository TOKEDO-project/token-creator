import React from 'react'
import './StepHeader.css'

const StepHeader = ({ icon, title, children }) => {
  return (
    <div className='top d-flex flex-column flex-sm-row flex-h-start flex-v-center'>
      <div className='left'>
        <img className='icon' src={icon} alt='Icon' />
      </div>
      <div className='right d-flex flex-column flex-h-center'>
        <span className='title text-center text-sm-left'>{title}</span>
        <span className='description font-size-small text-center text-sm-left'>{children}</span>
      </div>
    </div>
  )
}

export default StepHeader
