import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setType } from '../../redux/addToken'
import icon from '../../assets/images/token-type.svg'
import './Step.css'
import './StepRadioButtons.css'
import './TokenType.css'
import { translate } from 'react-i18next'
import StepHeader from './parts/StepHeader'

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
    const { valid, hover } = this.state
    const types = ['startable-burnable', 'startable', 'simple']
    const descriptions = [
      `In addition to the functionalities of the startable token, the burnable feature makes it possible to buy-back and burn the token and reduce the total supply.`,
      `The startable feature gives you the advantage to decide when to unlock the token. Usually you might want to keep it locked during the sale, and make it possible to sell and transfer it once the token sale is concluded.`,
      `It’s a token that is very easy to use, without any kind of extra functionality.`
    ]
    return (
      <div id='token-type' className='pure-u-1'>
        <div className={`step ${nextFunction ? 'alone' : ''} pure-u-1 d-flex flex-column flex-h-between`}>
          <StepHeader
            icon={icon}
            title={t(`Token type`)}
          >
            {t(`Choose one of the three options.`)}
          </StepHeader>
          <form className='fixedHeight'>
            <div className='bottom d-flex flex-row flex-h-between flex-wrap'>
              {types.map((type, index) =>
                <button
                  onMouseEnter={() => this.setState({ hover: index })}
                  onMouseLeave={() => this.setState({ hover: null })}
                  key={index}
                  value={type}
                  onClick={this.onChange}
                  type='button'
                  className={`radio-box ${addToken.type === type ? 'active' : ''} shadow pure-u-1 ${nextFunction ? 'pure-u-sm-7-24' : 'pure-u-lg-7-24'} d-flex flex-row flex-h-center flex-v-center`}
                >
                  {type === 'startable-burnable' ? t('Startable Burnable') : null}
                  {type === 'startable' ? t('Startable') : null}
                  {type === 'simple' ? t('Simple') : null}
                  <div className={`radio-button ${addToken.type === type ? 'active' : ''} d-flex flex-row flex-h-center flex-v-center`}>
                    <div className='radio-button-dot' />
                  </div>
                </button>
              )}
              <div className={`tooltip ${typeof hover === 'number' ? '' : 'hidden'} pure-u-1 font-size-tiny`}>
                {descriptions[hover]}
              </div>
            </div>

          </form>
        </div>
        {nextFunction ? <button className='deploy shadow pure-u-1' disabled={!valid} onClick={nextFunction} >{t('Deploy the Token')}</button> : null}
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenType))
