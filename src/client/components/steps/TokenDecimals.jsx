import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setDecimals } from '../../redux/addToken'
import icon from '../../assets/images/token-decimals.svg'
import './Step.css'
import './StepSingleInput.css'
import { translate } from 'react-i18next'

class TokenDecimals extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  onChangeText = (e) => {
    const value = e.target.value
    const { dispatch } = this.props

    dispatch(setDecimals(value))
    this.setState({
      valid: this.validate(value)
    })
  }

  validate = (input) => {
    const { setValid } = this.props
    const valid = input >= 0 && input <= 18

    if (setValid) {
      setValid(valid)
    }
    return valid
  }

  componentWillMount () {
    const { addToken } = this.props
    this.setState({ valid: this.validate(addToken.decimals) })
  }

  render () {
    const { addToken, nextFunction, t } = this.props
    const { valid } = this.state

    return (
      <div className='step pure-u-1 d-flex flex-column flex-h-between'>
        <div className='top d-flex flex-row flex-h-start flex-v-center'>
          <div className='left'>
            <img className='icon' src={icon} alt='Icon' />
          </div>
          <div className='right d-flex flex-column flex-h-center'>
            <span className='title'>{t(`Insert the decimals of your token`)}:</span>
            <span className='description font-size-tiny'>{t(`You can choose the decimal after the 0. Max length is 18.`)}<br />{t(`Ethereum has 18 decimals and bitcoin has only 8.`)}</span>
          </div>
        </div>
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className={`input-box ${nextFunction ? 'pure-u-16-24' : 'pure-u-1'} d-flex flex-column flex-v-center`}>
            <input placeholder={t(`Insert the decimals`)} className='token-decimals text shadow' value={addToken.decimals} onChange={this.onChangeText} />
            {!valid && addToken.decimals.length > 0 ? <div className='tooltip font-size-tiny d-flex flex-row flex-v-center'><div className='triangle' />{t(`The decimals number must be between 0 and 18`)}</div> : null}
          </div>
          {nextFunction ? <button className='next shadow pure-u-7-24' disabled={!valid} onClick={nextFunction} >
          Next
          </button> : null}
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenDecimals))
