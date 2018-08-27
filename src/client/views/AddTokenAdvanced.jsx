import React from 'react'

import TokenName from '../components/steps/TokenName'
import TokenSymbol from '../components/steps/TokenSymbol'
import TokenDecimals from '../components/steps/TokenDecimals'
import TokenSupply from '../components/steps/TokenSupply'
import TokenType from '../components/steps/TokenType'

class AddTokenAdvanced extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render () {
    return (<div>
      <div>
        <a href='/token/add/wizard'>wizard</a>
      </div>
      <h1>AddTokenAdvanced</h1>
      <TokenName />
      <TokenSymbol />
      <TokenDecimals />
      <TokenSupply />
      <TokenType />
    </div>)
  }
}

export default AddTokenAdvanced
