import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAmount } from '../../redux/addMainTokenSale'
import icon from '../../assets/images/token-supply.svg'
import './Step.css'
import './StepSingleInput.css'
import { translate } from 'react-i18next'

class MainTokenSaleAmount extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  onChangeText = (e) => {
    const value = e.target.value

    const { dispatch } = this.props
    dispatch(setAmount(value))
    this.setState({
      valid: this.validate(value)
    })

    const {onChangeCB} = this.props
    if (onChangeCB) {
      onChangeCB(value)
    }
  }

  validate = (input) => {
    const { setValid } = this.props
    const valid = input.length > 3

    if (setValid) {
      setValid(valid)
    }
    return valid
  }

  componentWillMount () {
    const { addMainTokenSale } = this.props
    console.log('AMOUNT', addMainTokenSale.amount)
    this.setState({ valid: this.validate(addMainTokenSale.amount) })
  }

  render () {
    const { addMainTokenSale, t } = this.props
    const { valid } = this.state

    return (
      <div className='step shadow pure-u-1'>
        <div className='top d-flex flex-row flex-h-start flex-v-center'>
          <div className='left'>
            <img className='icon' src={icon} alt='Icon' />
          </div>
          <div className='right d-flex flex-column flex-h-center'>
            <span className='title'>{t(`Insert the token amount`)}:</span>
            <span className='description'>{t(`Choose wisely.`)}</span>
          </div>
        </div>
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className='input-box d-flex flex-column flex-v-center'>
            <input placeholder={t(`Insert the total amount`)} className='token-supply text shadow' value={addMainTokenSale.amount} onChange={this.onChangeText} />
            {!valid && addMainTokenSale.amount.length > 0 ? <div className='tooltip d-flex flex-row flex-v-center'><div className='triangle' />{t(`The total amount must be longer than 3 characters`)}</div> : null}
          </div>
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(MainTokenSaleAmount))
