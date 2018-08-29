import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'

import { map } from 'lodash'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render () {
    const { t, tokens } = this.props
    console.log(tokens)
    if (Object.keys(tokens).length === 0) {
      return (<div> {t('Home')} <div><a href='/token/add/wizard'>{t('START NOW!')}</a></div> </div>)
    }
    return (
      <div>
        {t('List of Token')}
        <div>
          {map(tokens, (token, key) => {
            if (token.contractAddress) {
              return <div key={key}>
                {key} - {token.name}
                <a href={`/token/details/${token.contractAddress}`}>details</a>
              </div>
            }
          })}
        </div>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(Home))
