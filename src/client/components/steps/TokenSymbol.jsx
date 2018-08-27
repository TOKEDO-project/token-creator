import React from 'react'

const TokenSymbol = ({ nextFunction }) => {
  return (
    <div>
      <div>Insert the symbol of your token:</div>
      <input />
      <button onClick={nextFunction} >Next</button>
    </div>
  )
}

export default TokenSymbol
