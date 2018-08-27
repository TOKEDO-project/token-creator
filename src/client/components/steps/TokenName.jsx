import React from 'react'

const TokenName = ({nextFunction}) => {
  return (
    <div>
      <div>Insert the name of your token:</div>
      <input />
      { nextFunction ? <button onClick={nextFunction} >Next</button> : null }
    </div>
  )
}

export default TokenName
