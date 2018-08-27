import React from 'react'
import './PageNotFound.css'
import { withRouter } from 'react-router-dom'

const PageNotFound = ({history}) => {
  return (
    <div>
      PageNotFound
      <button type='button' onClick={() => history.push('/')}>Home Page</button>
    </div>
  )
}

export default withRouter(PageNotFound)
