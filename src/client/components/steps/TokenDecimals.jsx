import React from 'react'

const TokenDecimals = ({ nextFunction }) => {
  return (
    <div>
      <div>Insert the decimals of your token:</div>
      <input />
      <button onClick={nextFunction} >Next</button>
    </div>
  )
}

export default TokenDecimals
