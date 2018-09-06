import React, { Component } from 'react'
import './Modal.css'

export class Modal extends Component {
  render () {
    const { visible, toggleVisibility, title, icon } = this.props
    return (
      <div className={`modal ${visible ? 'visible' : ''} pure-u-1`}>
        <div className='background pure-u-1' />
        <div className='container pure-u-1 d-flex flex-row flex-h-center flex-v-center'>
          <div className='content pure-u-lg-4-5 pure-u-xl-3-5 pure-u-1 d-flex flex-column flex-v-center'>
            <div className='header pure-u-1 d-flex flex-row flex-h-between'>
              <div className='left d-flex flex-row flex-v-center'>
                <img className='icon' src={icon} alt='Icon' />
                <span className='title font-weight-medium font-size-huge'>{title}</span>
              </div>
              <button onClick={toggleVisibility} type='button' className='right d-flex flex-row flex-v-center'>
                <span className='text hideTxt'>Close</span>
                <span className='fa fa-times' />
              </button>
            </div>
            <div className='children pure-u-1'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
