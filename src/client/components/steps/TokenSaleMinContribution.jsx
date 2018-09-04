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

    const { dispatch, tokenId } = this.props
    dispatch(setMinContribution({tokenAddress: tokenId, minContribution: value}))
    this.setState({
      valid: this.validate(value)
    })
  }

  validate = (input) => {
    const { setValid } = this.props
    console.log('ASLKDJHASLKJDHASLKJDHASLKDJHASLKDJhj')
    const valid = input.length > 1
    console.log(input, valid)

    if (setValid) {
      setValid(valid)
    }
    return valid
  }

  componentWillMount () {
    const { addTokenSale, tokenId } = this.props
    this.setState({ valid: this.validate(addTokenSale[tokenId].minContribution) })
  }

  render () {
    const { addTokenSale, nextFunction, t, tokenId } = this.props
    const { valid } = this.state
    const minContribution = addTokenSale[tokenId].minContribution

    return (
      <div className='step pure-u-1 d-flex flex-column flex-h-between'>
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
            <input placeholder={t(`Insert the minimum contribution`)} className='token-name text shadow' value={minContribution} onChange={this.onChangeText} />
            {!valid && minContribution.length > 0 ? <div className='tooltip font-size-tiny d-flex flex-row flex-v-center'><div className='triangle' />{t(`The name must be longer than 3 characters`)}</div> : null}
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
