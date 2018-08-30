import React from 'react'
import { connect } from 'react-redux'

import { setTerms } from '../redux/preferences'
import './TermsAndConditions.css'
import shuttle from '../assets/images/shuttle.svg'

const TermsAndConditions = ({dispatch}) => {
  return (
    <div id='tac' className='pure-u-1 d-flex flex-column flex-v-center'>
      <img className='shuttle' src={shuttle} alt='Shuttle' />
      <div className='box shadow pure-u-4-5 pure-u-md-3-5 pure-u-lg-2-5'>
        <div className='text'>
          Commodo aliquip eiusmod deserunt dolor ullamco non qui veniam sit culpa laboris adipisicing minim incididunt. Occaecat pariatur proident nulla enim cillum anim. Ea veniam voluptate incididunt irure duis commodo ea.
          Do est id minim enim culpa ad labore reprehenderit labore ut. Id labore deserunt magna exercitation culpa velit adipisicing laborum consequat magna cupidatat cillum est amet. Voluptate magna tempor occaecat nulla enim cupidatat minim cupidatat amet labore. Ex proident adipisicing eiusmod id culpa nisi nulla laborum adipisicing. Excepteur ipsum dolor anim in. Commodo do occaecat consequat nostrud deserunt laborum.
          Veniam do velit excepteur eiusmod sunt eiusmod et deserunt in. Consectetur tempor deserunt ad magna in incididunt Lorem Lorem do id. Officia fugiat aliqua et et commodo occaecat sunt exercitation labore in mollit. Nostrud dolor nulla culpa eiusmod reprehenderit. Occaecat dolore aliquip nulla mollit ex consectetur aute ipsum qui non aliqua.
          Sint dolore mollit incididunt minim laboris fugiat eu exercitation. Nostrud cupidatat labore mollit dolor culpa culpa nostrud ut officia officia aliquip veniam duis. Minim duis sint sunt adipisicing id eu deserunt anim aute commodo exercitation culpa ex. Consequat sint amet amet Lorem id aliqua irure eu amet excepteur. Amet aliquip tempor et adipisicing. Sunt excepteur ex veniam tempor enim sit commodo. Nisi ea reprehenderit incididunt proident elit sunt voluptate dolore est sunt commodo tempor irure voluptate.
          Reprehenderit tempor incididunt est cupidatat tempor eiusmod consectetur. Excepteur reprehenderit in do ullamco exercitation nisi nulla. Ea mollit eu Lorem dolore laborum labore non cupidatat.
        </div>
      </div>
      <div className='buttons pure-u-4-5 pure-u-md-3-5 pure-u-lg-2-5 d-flex flex-row flex-h-between'>
        <a href='/'><button type='button' className='refuse shadow'>Refuse</button></a>
        <a><button type='button' className='accept shadow' onClick={() => dispatch(setTerms(true))}>Accept</button></a>
      </div>
    </div>
  )
}

export default connect(s => s)(TermsAndConditions)
