import React from 'react'
import { connect } from 'react-redux'

import { setTerms } from '../redux/preferences'
import './TermsAndConditions.css'

const TermsAndConditions = ({dispatch}) => {
  return (
    <div className='pure-u-1'>
      TermsAndConditions title <div> TermsAndConditions text</div>
      <button><a href='/'>Refuse</a></button>
      <button onClick={() => dispatch(setTerms(true))}>Accept</button>
    </div>
  )
}

export default connect(s => s)(TermsAndConditions)
