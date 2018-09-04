import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMinContribution } from '../../redux/addTokenSale'
import icon from '../../assets/images/token-name.svg'
import './Step.css'
import './StepSingleInput.css'
import { translate } from 'react-i18next'

class TokenSaleMinContribution extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }
  onChangeText = (e) => {
    const value = e.target.value

    const { dispatch } = this.props
    dispatch(setMinContribution(value))
    this.setState({
      valid: this.validate(value)
    })
  }

  validate = (input) => {
    const { setValid } = this.props
    const valid = input.length > 1

    if (setValid) {
      setValid(valid)
    }
    return valid
  }
  componentWillMount () {
    const { addTokenSale } = this.props
    this.setState({ valid: this.validate(addTokenSale.minContribution) })
  }

  render () {
    const { addTokenSale, nextFunction, t } = this.props
    const { valid } = this.state

    return (
      <div className='step shadow pure-u-1 d-flex flex-column flex-h-between'>
        <div className='top d-flex flex-row flex-h-start flex-v-center'>
          <div className='left'>
            <img className='icon' src={icon} alt='Icon' />
          </div>
          <div className='right d-flex flex-column flex-h-center'>
            <span className='title'>{t(`Insert the Minimum Contribution`)}:</span>
            <span className='description font-size-tiny'>{t(`Set the minimum value to accept for each contribution.`)}</span>
          </div>
        </div>
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className={`input-box ${nextFunction ? 'pure-u-16-24' : 'pure-u-1'} d-flex flex-column flex-v-center`}>
            <input placeholder={t(`Insert the minimum contribution`)} className='token-name text shadow' value={addTokenSale.minContribution} onChange={this.onChangeText} />
            {!valid && addTokenSale.minContribution.length > 0 ? <div className='tooltip font-size-tiny d-flex flex-row flex-v-center'><div className='triangle' />{t(`The name must be longer than 3 characters`)}</div> : null}
          </div>
          {nextFunction ? <button className='next shadow pure-u-7-24' disabled={!valid} onClick={nextFunction} >
            {t('Next')}
          </button> : null}
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSaleMinContribution))
