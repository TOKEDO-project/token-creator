import React, { Component } from 'react'
import './Header.css'
import logo from '../assets/images/logo.svg'
import { Menu } from './Menu'

export class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      menuOpen: false
    }
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render () {
    const { menuOpen } = this.state
    return (
      <header className='pure-u-1 d-flex flex-row flex-h-between flex-v-center'>
        <div className='left d-flex flex-row flex-v-end'>
          <img src={logo} alt='logo' className='logo' />
          <a href='#' className='title'>Token Creator</a>
        </div>
        <span onClick={this.toggleMenu} className={`fa ${menuOpen ? 'menuOpen fa-times' : 'fa-bars'} d-flex flex-row flex-v-center`} />
        <Menu open={menuOpen} />
      </header>
    )
  }
}

export default Header
