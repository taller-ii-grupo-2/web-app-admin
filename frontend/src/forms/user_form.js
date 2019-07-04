import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import Http, { OK, BAD_REQUEST} from '../service/http'

class UserForm extends Component{
	constructor(){
		super()
		this.state = {
			mail: '',
			password: '',
			name: '',
			surname: '',
			username: '',
			redirect:false
		}
	}

	handleEmail(text){
		this.setState({mail:text.target.value})
	}

	handlePassword(text){
		this.setState({password:text.target.value})
	}

	handleName(text){
		this.setState({name:text.target.value})
	}

	handleSurname(text){
		this.setState({surname:text.target.value})
	}

	handleUserName(text){
		this.setState({username:text.target.value})
	}

	cancel(){
		this.setState({redirect:true})
	}

	addUser(){
		let obj = {}
		obj.mail = this.state.mail
		obj.password = this.state.password
		obj.name = this.state.name
		obj.surname = this.state.surname
		obj.username = this.state.username

		Http.post('admin/users',obj)
		.then(res => {
			if (res.status === OK){
				this.setState({redirect: true})
				toast.success('User added', { position: toast.POSITION.TOP_CENTER })
			}
			console.log(res)
			return res.json()
		})
		.then(response => {
			if (!this.state.redirect){
				if (response){
					toast.error(response.message, { position: toast.POSITION.TOP_CENTER })
				}else{
					toast.error('Session expired', { position: toast.POSITION.TOP_CENTER })
				//	sessionStorage.removeItem('token')
				}
			}
    })
    .catch(err => {
    	alert(err)
    	toast.error(err, { position: toast.POSITION.TOP_CENTER })
    })	
	}

  render() {
  	if (!sessionStorage.getItem('token')){
  		return <Redirect to='/login' />;
  	}
  	if(this.state.redirect){
  		return <Redirect to='/users' />;
  	}

    return (
    	<div className="UserForm">
				<header className="UserForm-header">
					<h1 className="UserForm-title"> Add user </h1>
				</header>

				<input type="text" placeholder="Enter mail" onChange={(text) => {this.handleEmail(text)}}/>
				<br/>
				<input type="password" placeholder="Enter password" onChange={(text) => {this.handlePassword(text)}}/>
				<br/>
				<input type="text" placeholder="Enter name" onChange={(text) => {this.handleName(text)}}/>
				<br/>
				<input type="text" placeholder="Enter surname" onChange={(text) => {this.handleSurname(text)}}/>
				<br/>
				<input type="text" placeholder="Enter username" onChange={(text) => {this.handleUserName(text)}}/>
				<br/>
				<button onClick={()=>{this.cancel()}} >Cancel</button>
				<button onClick={()=>{this.addUser()}} >Submit</button>
				<ToastContainer/>
				</div>
    );
  }
}

export default UserForm