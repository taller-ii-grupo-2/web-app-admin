import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast } from 'react-toastify';
import Http, { OK } from '../service/http'

class Index extends Component{

	logout(){
		sessionStorage.removeItem('token')
	}

	render(){
		if (!sessionStorage.getItem('token')){
			return <Redirect to='/login' />;
		}
  	return (
    	<div className="Index">
				<header className="Index-header">
					<div>
					<Link to={"/users"} activeClassName="users">Users</Link>
					</div>
					<div>
					<Link to={"/organizations"} activeClassName="organizations">Organizations</Link>
					</div>
					<div>
					<button onClick={()=>{this.logout()}} >Logout</button>
					</div>
					<ToastContainer/>
				</header>
			</div>
    );
  }
}

export default Index