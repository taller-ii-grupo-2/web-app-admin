import React, { Component } from 'react'

class Auth extends Component{
	constructor(){
		super()
		this.state = {
			email:'',
			password:''

		}
	}

	render(){
		return(
			<div className="Auth">
				<header className="Auth-header">
					<h1 className="Auth-title"> Admin Login </h1>
				</header>

				<input type="text" placeholder="Enter mail" />
				<br/>
				<input type="password" placeholder="Enter password" />
				<br/>
				<button> Login </button>

				</div>
		);
	}
}

export default Auth