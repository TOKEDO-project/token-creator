import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { setAmount } from '../../redux/addMainTokenSale'
import { getTokenInfo } from '../../utils/tokens'
import bnUtils from '../../../../bnUtils'
import icon from '../../assets/images/token-supply.svg'
import './Step.css'
import './StepSingleInput.css'

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
    const { setValid, contractAddress, tokens } = this.props
    const tokenInfo = getTokenInfo(contractAddress, tokens)
    const valid = input.length > 3 && bnUtils.lte(input, tokenInfo.supply)

    if (setValid) {
      setValid(valid)
    }
    return valid
  }

  componentWillMount () {
    const { addMainTokenSale } = this.props
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
            {!valid && addMainTokenSale.amount.length > 0 ? <div className='tooltip d-flex flex-row flex-v-center'><div className='triangle' />{t(`Amount must be less than or equal to the Token supply`)}</div> : null}
          </div>
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(MainTokenSaleAmount))
