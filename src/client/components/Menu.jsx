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
        <a href='/' className='item active d-flex flex-row flex-h-between flex-v-center'>
          <span>Home</span>
        </a>
        <a href='/faq' className='item d-flex flex-row flex-h-between flex-v-center'>
          <span>FAQ</span>
        </a>
        <a href='/help' className='item d-flex flex-row flex-h-between flex-v-center'>
          <span>Help</span>
        </a>
        <a href='/credits' className='item d-flex flex-row flex-h-between flex-v-center'>
          <span>Credits</span>
        </a>
      </div>
    )
  }
}

export default Menu
