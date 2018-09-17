import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setStartTime, setEndTime } from '../../redux/addTokenSale'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import icon from '../../assets/images/token-sale-date.svg'
import calendar from '../../assets/images/calendarInput.svg'
import './Step.css'
import './StepDateField.css'
import { translate } from 'react-i18next'
import moment from 'moment'
import StepHeader from './parts/StepHeader'

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
          title={t(`Choose start and end time`)}
        >
          {t(`Input the start and end date to define the period of time during which the smart contract of this specific token sale can accept a transaction.`)}
        </StepHeader>
        <form className='bottom d-flex flex-row flex-h-between flex-v-end'>
          <div className={`date-pickers d-flex flex-column pure-u-1`}>

            <div className='date-picker pure-u-1 d-flex flex-column'>
              <span className='date-picker-title'>Start Time</span>
              <div className='dateWrap'>
                <img src={calendar} />
                <DatePicker
                  selected={moment(startTime, 'x')}
                  minDate={moment()}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={1}
                  dateFormat='LLL'
                  timeCaption='time'
                  onChange={this.onChangeStartTime}
                />
              </div>

            </div>

            <div className='date-picker pure-u-1 d-flex flex-column'>
              <span className='date-picker-title'>End Time</span>
              <div className='dateWrap'>
                <img src={calendar} />
                <DatePicker
                  selected={moment(endTime, 'x')}
                  minDate={moment()}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={1}
                  dateFormat='LLL'
                  timeCaption='time'
                  onChange={this.onChangeEndTime}
                />
              </div>
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
