import React, { Component } from 'react'
import { connect } from 'react-redux'
import icon from '../../assets/images/token-name.svg'
import './Step.css'
import './StepSingleInput.css'
import { translate } from 'react-i18next'

class TokenSaleAddAmount extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }
  onChangeText = (e) => {
    const value = e.target.value
    /* Needs a real dispatch condition
        const { dispatch } = this.props
        dispatch(setName(value)) */
    this.setState({
      valid: this.validate(value)
    })
  }

  validate = (input) => {
    const { setValid } = this.props
    const valid = true // Needs a real validation condition

    if (setValid) {
      setValid(valid)
    }
    return valid
  }
  componentWillMount () {
    /* Needs the real pointer to this variable
    const { addToken } = this.props
    this.setState({ valid: this.validate(addToken.name) }) */
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
            <span className='title'>{t(`Insert amount of tokens to add`)}:</span>
            <span className='description font-size-tiny'>{t(`The quantity of tokens you want to add.`)}</span>
          </div>
        </div>
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className={`input-box ${nextFunction ? 'pure-u-16-24' : 'pure-u-1'} d-flex flex-column flex-v-center`}>
            <input placeholder={t(`Insert the amount`)} className='token-name text shadow' value={addToken.name} onChange={this.onChangeText} />
            {!valid && addToken.name.length > 0 ? <div className='tooltip font-size-tiny d-flex flex-row flex-v-center'><div className='triangle' />{t(`Do not know the error yet`)}</div> : null}
          </div>
          {nextFunction ? <button className='next shadow pure-u-7-24' disabled={!valid} onClick={nextFunction} >
          Next
          </button> : null}
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSaleAddAmount))
