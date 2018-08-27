import React from 'react'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render () {
    return (<div> Home <div><a href='/token/add/wizard'>START NOW!</a></div> </div>)
  }
}

export default Home
