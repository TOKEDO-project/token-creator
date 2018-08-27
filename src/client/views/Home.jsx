import React from 'react'

import Localization from '../Localization'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render () {
    return (<div> {Localization.home} <div><a href='/token/add/wizard'>{Localization.start_now}</a></div> </div>)
  }
}

export default Home
