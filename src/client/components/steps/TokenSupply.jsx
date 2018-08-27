import React from 'react'

const TokenSupply = ({ nextFunction }) => {
  return (
    <div>
      <div>Insert the total supply of your token:</div>
      <input />
      { nextFunction ? <button onClick={nextFunction} >Next</button> : null }
    </div>
  )
}

export default TokenSupply
