import React, { Component } from 'react'
import './Menu.css'

export class Menu extends Component {
  render () {
    const { open } = this.props
    return (
      <div id='sidebar' className={`${open ? 'open' : ''} d-flex flex-column`}>
        <div className='item title d-flex flex-row flex-h-between flex-v-center'>
          <span>Menu</span>
        </div>
        <div className='item active d-flex flex-row flex-h-between flex-v-center'>
          <span>Home</span>
        </div>
        <div className='item d-flex flex-row flex-h-between flex-v-center'>
          <span>FAQ</span>
        </div>
        <div className='item d-flex flex-row flex-h-between flex-v-center'>
          <span>Help</span>
        </div>
        <div className='item d-flex flex-row flex-h-between flex-v-center'>
          <span>Credits</span>
        </div>
      </div>
    )
  }
}

export default Menu
