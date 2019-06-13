import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Http from './service/http'
//import Auth from './components/auth'

class App extends Component {
	constructor(){
		super()
		this.state = {
			email:'',
			password:''

		}
	}

	handleEmail(text){
		this.setState({email:text.target.value})

	}

	handlePassword(text){
		this.setState({password:text.target.value})

	}

	login(){
		let obj = {}
		obj.email = this.state.email
		obj.password = this.state.password
		Http.post('adminlogin',obj).then(response => {
			if (response.status === Http.OK){
        document.write("todo bien")
      }else{
        document.write("todo mal")
      }
		})	
	}

  render() {
    return (
    	<div className="Auth">
				<header className="Auth-header">
					<h1 className="Auth-title"> Admin Login </h1>
				</header>

				<input type="text" placeholder="Enter mail" onChange={(text) => {this.handleEmail(text)}}/>
				<br/>
				<input type="password" placeholder="Enter password" onChange={(text) => {this.handlePassword(text)}}/>
				<br/>
				<button onClick={()=>{this.login()}} >Login</button>

				</div>
    );
  }
}

export default App;