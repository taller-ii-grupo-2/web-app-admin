import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast } from 'react-toastify';
import Http, { OK } from '../service/http'

class Index extends Component{
	constructor(){
		super()
		this.state = {
			redirect: false
		}
	}

	logout(){
		sessionStorage.removeItem('token')
		this.setState({redirect:true})
		return <Redirect to='/login' />;
	}

	render(){
		if (this.state.redirect){
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
					<Link to={"/orgas/words"} activeClassName="words">Words</Link>
					</div>
					<div>
					<Link to={"/orgas/bots"} activeClassName="bots">Bots</Link>
					</div>
					<div>
					<Link to={"/graph"} activeClassName="graph">Graph</Link>
					</div>
					<button onClick={()=>{this.logout()}} >Logut</button>
					<ToastContainer/>
				</header>
			</div>
    );
  }
}

export default Index