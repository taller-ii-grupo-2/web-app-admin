import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import Http, { OK } from '../service/http'

class User extends Component{
	constructor(){
		super()
		this.state = {
			users:0,
			redirect:false
		}
		this.setUsers()
	}

	setUsers(){
		Http.get('users/total').then(resp=>{
			if (resp.status === OK){
				return resp.json()	
			}else{
				sessionStorage.removeItem('token')
				this.setState({redirect:true})
			}
		})
		.then(response => {
			if (!this.state.redirect){
				this.setState({users: response.count})
			}	
		})
	}

  render() {
  	if (this.state.redirect){
  		toast.error('Invalid credentials', { position: toast.POSITION.TOP_CENTER })
  		return <Redirect to='/login' />;
  	}
    return (
    	<div className="User">
				<header className="User-header">
					<h1 className="Users-title"> Users </h1>
				</header>
				 <div>Amount of users: { this.state.users }</div>
				 <ToastContainer/>
			</div>
    );
  }
}

export default User