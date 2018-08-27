import React from 'react'

const TokenSymbol = ({ nextFunction }) => {
  return (
    <div>
      <div>Insert the symbol of your token:</div>
      <input />
      { nextFunction ? <button onClick={nextFunction} >Next</button> : null }
    </div>
  )
}

export default TokenSymbol
