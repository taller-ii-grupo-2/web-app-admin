import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast } from 'react-toastify';
import Http, { OK } from '../service/http'

class Index extends Component{

  render() {
  	
    return (

    	
    	<div className="Index">
				<header className="Index-header">
					<div>
					<Link to={"/users"} activeClassName="users">Users</Link>
					</div>
					<div>
					<Link to={"/organizations"} activeClassName="organizations">Organizations</Link>
					</div>
					<ToastContainer/>
				</header>
			</div>
    );
  }
}

export default Index