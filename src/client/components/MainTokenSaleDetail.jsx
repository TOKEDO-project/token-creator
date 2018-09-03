import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

const MainTokenSaleDetail = ({addMainTokenSale: { amount, state }}) => {
  return (
    <div className=''>
      <div>
      Token Sale
      </div>
      <div>
      Token for Sale
      </div>
      <div>
        {state === 'authorized'
          ? amount
          : 'Waiting '}
      </div>
      <div>
        {state === 'authorized'
          ? <div>
            <button>Add Token Sale</button>
            <button>Add More Token</button>
            <button>Remove token</button>
          </div>
          : null }
      </div>
    </div>
  )
}

export default translate('translations')(connect(s => s)(MainTokenSaleDetail))
