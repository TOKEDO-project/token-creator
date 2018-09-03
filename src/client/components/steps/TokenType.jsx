import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setType } from '../../redux/addToken'
import icon from '../../assets/images/token-type.svg'
import './Step.css'
import './StepRadioButtons.css'
import './TokenType.css'
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
    const types = ['startable-burnable', 'startable', 'simple']
    return (
      <div id='token-type' className='pure-u-1'>
        <div className='step shadow pure-u-1 d-flex flex-column flex-h-between'>
          <div className='top d-flex flex-row flex-h-start flex-v-center'>
            <div className='left'>
              <img className='icon' src={icon} alt='Icon' />
            </div>
            <div className='right d-flex flex-column flex-h-center'>
              <span className='title'>{t(`Select the Token type`)}:</span>
              <span className='description font-size-tiny'>{t(`We offer different versions of token.`)}</span>
            </div>
          </div>
          <form className='bottom d-flex flex-row flex-h-between flex-wrap'>
            {types.map((type, index) =>
              <button key={index} value={type} onClick={this.onChange} type='button' className={`radio-box ${addToken.type === type ? 'active' : ''} shadow pure-u-1 ${nextFunction ? 'pure-u-sm-7-24' : 'pure-u-lg-7-24'} d-flex flex-row flex-h-center flex-v-center`}>
                {type === 'startable-burnable' ? `Startable Burnable` : null}
                {type === 'startable' ? `Startable` : null}
                {type === 'simple' ? `Simple` : null}
                <div className={`radio-button ${addToken.type === type ? 'active' : ''} d-flex flex-row flex-h-center flex-v-center`}>
                  <div className='radio-button-dot' />
                </div>
              </button>
            )}
          </form>
        </div>
        {nextFunction ? <button className='deploy shadow pure-u-1' disabled={!valid} onClick={nextFunction} >Deploy the Token</button> : null}
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenType))
