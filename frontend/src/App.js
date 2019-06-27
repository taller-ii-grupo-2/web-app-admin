import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Auth from './components/auth'
import User from './components/users'
import Orga from './components/organizations'
import Index from './components/indice'
import Word from './components/words'
import UserForm from './forms/user_form'
import UpdateUsersForm from './forms/update_users_form'
import UpdateOrgasForm from './forms/update_orgas_form'
import OrgaForm from './forms/orga_form'
import WordForm from './forms/words_form'

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
              <Route exact path="/users/update/form"
                render={routeProps => <UpdateUsersForm {...routeProps}/>} />
              <Route exact path="/orgas/form"
                render={routeProps => <OrgaForm {...routeProps}/>} />
              <Route exact path="/orgas/update_form"
                render={routeProps => <UpdateOrgasForm {...routeProps}/>} />
              <Route exact path="/orgas/words_form"
                render={routeProps => <WordForm {...routeProps}/>} />
              <Route exact path="/orgas/words"
                render={routeProps => <Word {...routeProps}/>} />
            </div>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;