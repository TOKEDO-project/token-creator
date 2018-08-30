import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setType } from '../../redux/addToken'
import icon from '../../assets/images/token-type.svg'
import './Step.css'
import './StepRadioButtons.css'
import { translate } from 'react-i18next'

class TokenType extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: true
    }
  }

  onChange = (e) => {
    const { dispatch } = this.props
    dispatch(setType(e.target.value))
  }

  render () {
    const { addToken, nextFunction, t } = this.props
    const { valid } = this.state

    return (
      <div className='pure-u-1'>
        <div className='step shadow pure-u-1'>
          <div className='top d-flex flex-row flex-h-start flex-v-center'>
            <div className='left'>
              <img className='icon' src={icon} alt='Icon' />
            </div>
            <div className='right d-flex flex-column flex-h-center'>
              <span className='title'>{t(`Select the Token type`)}:</span>
              <span className='description'>{t(`We offer different versions of token.`)}</span>
            </div>
          </div>
          <form className='bottom d-flex flex-row flex-h-center'>
            <button value='startable-burnable' onClick={this.onChange} type='button' className={`radio-box ${addToken.type === 'startable-burnable' ? 'active' : ''} shadow pure-u-7-24 d-flex flex-row flex-h-center flex-v-center`}>
              Startable<br />Burnable
              <div className={`radio-button ${addToken.type === 'startable-burnable' ? 'active' : ''} d-flex flex-row flex-h-center flex-v-center`}>
                <div className='radio-button-dot' />
              </div>
            </button>
            <button value='startable' onClick={this.onChange} type='button' className={`radio-box ${addToken.type === 'startable' ? 'active' : ''} shadow pure-u-7-24 d-flex flex-row flex-h-center flex-v-center`}>
              Startable
              <div className={`radio-button ${addToken.type === 'startable' ? 'active' : ''} d-flex flex-row flex-h-center flex-v-center`}>
                <div className='radio-button-dot' />
              </div>
            </button>
            <button value='simple' onClick={this.onChange} type='button' className={`radio-box ${addToken.type === 'simple' ? 'active' : ''} shadow pure-u-7-24 d-flex flex-row flex-h-center flex-v-center`}>
              Simple
              <div className={`radio-button ${addToken.type === 'simple' ? 'active' : ''} d-flex flex-row flex-h-center flex-v-center`}>
                <div className='radio-button-dot' />
              </div>
            </button>
          </form>
        </div>
        {nextFunction ? <button className='deploy shadow pure-u-1' disabled={!valid} onClick={nextFunction} >Deploy the Token</button> : null}
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenType))
