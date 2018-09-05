import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setStartTime, setEndTime } from '../../redux/addTokenSale'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import icon from '../../assets/images/token-name.svg'
import './Step.css'
import './StepSingleInput.css'
import './StepDropdown.css'
import { translate } from 'react-i18next'
import moment from 'moment'

class TokenSaleStartEndTime extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  onChangeStartTime = (date) => {
    const { dispatch, tokenId } = this.props
    dispatch(setStartTime({ tokenAddress: tokenId, startTime: date.valueOf() + '' }))
  }

  onChangeEndTime = (date) => {
    const { dispatch, tokenId } = this.props
    dispatch(setEndTime({ tokenAddress: tokenId, endTime: date.valueOf() + '' }))
  }

  render () {
    const { addTokenSale, nextFunction, t, tokenId } = this.props
    const startTime = addTokenSale[tokenId].startTime
    const endTime = addTokenSale[tokenId].endTime

    return (
      <div className='step pure-u-1 d-flex flex-column flex-h-between'>
        <div className='top d-flex flex-row flex-h-start flex-v-center'>
          <div className='left'>
            <img className='icon' src={icon} alt='Icon' />
          </div>
          <div className='right d-flex flex-column flex-h-center'>
            <span className='title'>{t(`Choose the start and end time`)}:</span>
            <span className='description font-size-tiny'>{t(`Each token sale can have different price. Here you must set the current price of this token sale smart contract. The price must be in ETH.`)}</span>
          </div>
        </div>
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className={`input-box dropdown ${nextFunction ? 'pure-u-16-24' : 'pure-u-1'} d-flex flex-column flex-v-center`}>
            <div className='pure-u-1 d-flex flex-row'>
              Start Time
              <DatePicker
                selected={moment(startTime, 'x')}
                onChange={this.onChangeStartTime}
              />
            </div>
            <div className='pure-u-1 d-flex flex-row'>
              End Time
              <DatePicker
                selected={moment(endTime, 'x')}
                onChange={this.onChangeEndTime}
              />
            </div>
          </div>
          {nextFunction ? <button className='next shadow pure-u-7-24' onClick={nextFunction} >
            {t('Next')}
          </button> : null}
        </form>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenSaleStartEndTime))
