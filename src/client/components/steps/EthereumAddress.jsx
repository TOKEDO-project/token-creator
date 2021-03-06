import React, { Component } from 'react'
import { connect } from 'react-redux'
import icon from '../../assets/images/token-name.svg'
import './Step.css'
import './StepSingleInput.css'
import { translate } from 'react-i18next'
import StepHeader from './parts/StepHeader'

class EthereumAddress extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false,
      address: ''
    }
  }
  onClickNext = (e) => {
    e.preventDefault()
    console.log('EthereumAddress', 'onClickNext')
    const {onIsValidCB} = this.props
    const {address} = this.state
    const value = address
    const isValid = this.validate(value)
    console.log('address', address)
    this.setState({ valid: isValid })
    if (onIsValidCB && isValid) { onIsValidCB(value) }
  }
  onChangeText = (e) => {
    const { onChangeAddress, onValidAddress } = this.props
    const value = e.target.value
    const isValid = this.validate(value)
    this.setState({
      address: value,
      valid: isValid
    })
    if (onChangeAddress) { onChangeAddress(value) }
    if (onValidAddress) { onValidAddress(isValid) }
  }

  validate = (input) => {
    const { setValid, web3 } = this.props
    const valid = web3.utils.isAddress(input)

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
  onSubmit = (e) => {
    e.preventDefault()
    const { valid } = this.state
    if (valid) {
      this.onClickNext()
    }
  }
  render () {
    const { t, title, description, hideNextButton } = this.props

    const { valid, address } = this.state
    const errorMessage = t('Must be a valid Ethereum address')
    return (
      <div className='step pure-u-1 d-flex flex-column flex-h-between'>
        <StepHeader
          icon={icon}
          title={title}
        >
          {description}
        </StepHeader>
        <form className='bottom d-flex flex-row flex-h-between' onSubmit={this.onSubmit}>
          <div className='input-box pure-u-1 d-flex flex-column flex-v-center'>
            <input placeholder={t(`Insert Ethereum address`)} className='token-name text shadow pure-u-1' value={address} onChange={this.onChangeText} />
            {!valid ? <div className='tooltip font-size-tiny pure-u-1 d-flex flex-row flex-v-center'><div className='triangle' />{errorMessage}</div> : null}
          </div>
          {valid && !hideNextButton ? <button className='next shadow pure-u-7-24' onClick={this.onClickNext}>{t('Next')}</button> : null }
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(EthereumAddress))
