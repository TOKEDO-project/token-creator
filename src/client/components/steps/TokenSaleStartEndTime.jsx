import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setStartTime, setEndTime } from '../../redux/addTokenSale'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import icon from '../../assets/images/token-name.svg'
import './Step.css'
import './StepDateField.css'
import { translate } from 'react-i18next'
import moment from 'moment'
import { StepHeader } from './parts/StepHeader'

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
      <div className={`step ${nextFunction ? 'alone' : ''} pure-u-1 d-flex flex-column flex-h-between`}>
        <StepHeader
          icon={icon}
          title={t(`Choose the start and end time`)}
          description={t(`Each token sale can have different price. Here you must set the current price of this token sale smart contract. The price must be in ETH.`)}
        />
        <form className='bottom d-flex flex-row flex-h-between'>
          <div className={`date-pickers d-flex flex-column flex-v-center`}>
            <div className='date-picker pure-u-1 d-flex flex-column'>
              <span>Start Time:</span>
              <DatePicker
                selected={moment(startTime, 'x')}
                onChange={this.onChangeStartTime}
              />
            </div>
            <div className='date-picker pure-u-1 d-flex flex-column'>
              <span>End Time:</span>
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
