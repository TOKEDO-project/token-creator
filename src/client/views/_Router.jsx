import React from 'react'
import PageNotFound from '../components/PageNotFound'

import Home from '../views/Home'
import AddTokenAdvanced from '../views/AddTokenAdvanced'
import AddTokenWizard from '../views/AddTokenWizard'
import TokenDetails from '../views/TokenDetails'
import HelpPage from '../views/HelpPage'
import AboutPage from '../views/AboutPage'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import './_Router.css'

const AppRouter = () => {
  return (
    <main className='pure-u-1'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/token/add/advanced' component={AddTokenAdvanced} />
          <Route exact path='/token/add/wizard' component={AddTokenWizard} />
          <Route exact path='/token/details/:tokenId' component={TokenDetails} />
          <Route exact path='/help' component={HelpPage} />
          <Route exact path='/about' component={AboutPage} />
          <Route render={() => <PageNotFound />} />
        </Switch>
      </Router>
    </main>
  )
}

export default AppRouter
