import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import {  ToastContainer, toast } from 'react-toastify';
import Http, { OK } from '../service/http'

class Auth extends Component{
	constructor(){
		super()
		this.state = {
			email:'',
			password:'',
			redirect: false
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
			if (res.status === OK){
				this.setState({redirect: true})
				toast.success('Login succesfull', { position: toast.POSITION.TOP_CENTER })
				return res.json()
			}else{
				toast.error('Invalid credentials', { position: toast.POSITION.TOP_CENTER })
			}
		})
		.then(response => {
			if (this.state.redirect){
				sessionStorage.setItem('token',response.token)
			}
    })	
	}

  render() {
  	if (this.state.redirect || sessionStorage.getItem('token')){
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