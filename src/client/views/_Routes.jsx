import React from 'react'
import PageNotFound from '../components/PageNotFound'

import Home from '../views/Home'
import AddTokenAdvanced from '../views/AddTokenAdvanced'
import AddTokenWizard from '../views/AddTokenWizard'
import TokenDetails from '../views/TokenDetails'
import FaqPage from '../views/FaqPage'
import HelpPage from '../views/HelpPage'
import Credits from '../views/Credits'
import AboutPage from '../views/AboutPage'

import {
  Route,
  Switch
} from 'react-router-dom'
import './_Routes.css'
import TokenAddress from '../components/steps/TokenAddress'

const AppRouter = () => {
  return (
    <main className='pure-u-1 d-flex flex-column flex-v-center'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/token/add/advanced' component={AddTokenAdvanced} />
        <Route exact path='/token/add/wizard' component={AddTokenWizard} />
        <Route exact path='/token/details/:tokenId' component={TokenDetails} />
        <Route exact path='/token/details/:tokenId/add-token-sale' component={(props) => <TokenDetails {...props} addTokenSaleForm />} />
        <Route exact path='/token/receipt/:tokenId' component={TokenAddress} />
        <Route exact path='/faq' component={FaqPage} />
        <Route exact path='/help' component={HelpPage} />
        <Route exact path='/credits' component={Credits} />
        <Route exact path='/about' component={AboutPage} />
        <Route render={() => <PageNotFound />} />
      </Switch>
    </main>
  )
}

export default AppRouter
