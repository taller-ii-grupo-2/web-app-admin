import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import Http, { OK } from '../service/http'

class User extends Component{
	constructor(){
		super()
		this.state = {
			users: 0,
			redirect:false
		}
		this.setUsers();
	}

	setUsers(){
		Http.get('admin/users').then(res=>{
			return {resp:res.json(),
							status: res.status
						}
		})
		.then(response => {
			if (response.status === OK){
				this.setState({users:response.resp.count})
			}else{
				sessionStorage.removeItem('token')
			}
		})
	}

	addUser(){
		this.setState({redirect:true})
	}

  render() {
  	if (!sessionStorage.getItem('token')){
  		return <Redirect to='/login' />;
  	}
  	if(this.state.redirect){
  		return <Redirect to='/users/form' />;
  	}

    return (
    	<div className="User">
				<header className="User-header">
					<h1 className="Users-title"> Users </h1>
				</header>
				 <div>Amount of users: { this.state.users }</div>
				 <div>
				 <button onClick={()=>{this.addUser()}} >Add</button>
				 </div>
				 <ToastContainer/>
			</div>
    );
  }
}

export default User