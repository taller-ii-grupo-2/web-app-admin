import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Auth from './components/auth'
import User from './components/users'
import Orga from './components/organizations'
import Index from './components/indice'
import UserForm from './forms/user_form'

class App extends Component {
	
  render() {
    return (
    	<React.Fragment>
        <div>
          <Router>
            <div>
              <Route exact path="/"
                render={routeProps => <Auth {...routeProps}/>} />
              <Route exact path="/login"
                render={routeProps => <Auth {...routeProps}/>} />
              <Route exact path="/users"
                render={routeProps => <User {...routeProps}/>} />
              <Route exact path="/organizations"
                render={routeProps => <Orga {...routeProps}/>} />
              <Route exact path="/index"
                render={routeProps => <Index {...routeProps}/>} />
              <Route exact path="/users/form"
                render={routeProps => <UserForm {...routeProps}/>} />
            </div>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;