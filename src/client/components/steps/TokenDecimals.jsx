import React from 'react'

const TokenDecimals = ({ nextFunction }) => {
  return (
    <div>
      <div>Insert the decimals of your token:</div>
      <input />
      { nextFunction ? <button onClick={nextFunction} >Next</button> : null }
    </div>
  )
}

export default TokenDecimals
