import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import {  ToastContainer, toast } from 'react-toastify';
import Http, { OK } from '../service/http'

class Auth extends Component{
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
		Http.post('adminlogin',obj)
		.then(res => {
			return {resp:res.json(),
							status: res.status
						}
		})
		.then(response => {
			if (response.status === OK){
				sessionStorage.setItem('token',response.token);
				toast.success('Login succesfull', { position: toast.POSITION.TOP_CENTER })
			}else{
				toast.error('Invalid credentials', { position: toast.POSITION.TOP_CENTER })
			}
    })	
	}

  render() {
  	if (sessionStorage.getItem('token')){
  		return <Redirect to='/index' />;
  	}

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
				<ToastContainer/>
				</div>
    );
  }
}

export default Auth