import React from 'react'

const TokenName = ({nextFunction}) => {
  return (
    <div>
      <div>Insert the name of your token:</div>
      <input />
      <button onClick={nextFunction} >Next</button>
    </div>
  )
}

export default TokenName
