import React, { Component } from 'react';
import './App.css';
import Login from './components/login';

class App extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  render(){
    return (
          <Login/>
    )
  }
}

export default App;
