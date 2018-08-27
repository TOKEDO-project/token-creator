import React from 'react'

const TokenSupply = ({ nextFunction }) => {
  return (
    <div>
      <div>Insert the total supply of your token:</div>
      <input />
      <button onClick={nextFunction} >Next</button>
    </div>
  )
}

export default TokenSupply
