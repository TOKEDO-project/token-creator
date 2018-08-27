import React from 'react'
import PageNotFound from '../components/PageNotFound'
import Loading from '../components/Loading'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import './_Router.css'

const AppRouter = ({web3}) => {
  return (
    <div className='main'>
      <Router>
        {web3.loading
          ? <Loading />
          : <div className='pure-u-1'>
            <Switch>
              <Route exact path='/' component={Main} />
              <Route exact path='/token' >
                <Route exact path='/add/advanced' component={AddTokenAdvanced} />
                <Route exact path='/add/wizard' component={AddTokenWizard} />
                <Route exact path='/:token_id' component={TokenDetails} />
              </Route>
              <Route exact path='/help' component={HelpPage} />
              <Route exact path='/about' component={AboutPage} />
              <Route render={() => <PageNotFound />} />
            </Switch>
          </div>
        }
      </Router>
    </div>
  )
}

export default AppRouter
