import React from 'react'
import './Loading.css'

const Loading = ({ size, color, isView }) => {
  return <div className={`${isView ? 'loading' : ''} pure-u-1 d-flex flex-row flex-h-center flex-v-center`}>
    <div className='lds-dual-ring' style={{ width: `${size}px`, height: `${size}px`, margin: `${size}px 0` }}>
      <div className='lds-dual-ring-inner' style={{borderColor: `${color} transparent ${color} transparent`}} />
    </div>
  </div>
}

export default Loading
