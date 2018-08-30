import React from 'react'
import './Loading.css'

const Loading = ({ size }) => {
  return <div className='pure-u-1 d-flex flex-row flex-h-center flex-v-center'><div className='lds-dual-ring' style={{ width: size, height: size }} /></div>
}

export default Loading
