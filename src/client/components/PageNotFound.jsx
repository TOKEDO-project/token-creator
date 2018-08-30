import React from 'react'
import './PageNotFound.css'
import { withRouter } from 'react-router-dom'

const PageNotFound = ({history}) => {
  return (
    <div id='notFound' className='d-flex flex-h-center'>
      <div className='pure-u-22-24 pure-u-md-18-24 pure-u-sm-20-24'>
        <div>
           PageNotFound

          <button type='button' onClick={() => history.push('/')}>Home Page</button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(PageNotFound)
