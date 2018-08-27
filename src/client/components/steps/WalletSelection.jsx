import React from 'react'

const WalletSelection = ({nextFunction}) => {
  return (
    <div>
      <div>Select the wallet</div>
      <button onClick={nextFunction}>Create Token</button>
    </div>
  )
}

export default WalletSelection
