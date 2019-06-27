import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import Http, { OK, BAD_REQUEST} from '../service/http'
import PropTypes from 'prop-types'

class OrgaForm extends Component{
	constructor(){
		super()
		this.state = {
			name: '',
			description: '',
			welcome: '',
			redirect:false
		}
	}

	handleName(text){
		this.setState({name:text.target.value})
	}

	handleDescription(text){
		this.setState({description:text.target.value})
	}

	handleWelcome(text){
		this.setState({welcome:text.target.value})
	}

	cancel(){
		this.setState({redirect:true})
	}

	addOrga(){
		let obj = {}
		obj.mail = this.props.location.state.id.mail
		obj.name = this.state.name
		obj.description = this.state.description
		obj.welcomMsg = this.state.welcome

		Http.post('admin/orgas',obj)
		.then(res => {
			if (res.status === OK){
				this.setState({redirect: true})
				toast.success('Orga added', { position: toast.POSITION.TOP_CENTER })
			}
			return res.json()
		})
		.then(response => {
			if (!this.state.redirect){
				if (response){
					toast.error(response.message, { position: toast.POSITION.TOP_CENTER })
				}else{
					toast.error('Session expired', { position: toast.POSITION.TOP_CENTER })
					sessionStorage.removeItem('token')
				}
			}
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
    	<div className="OrgaForm">
				<header className="OrgaForm-header">
					<h1 className="OrgaForm-title"> Add orga </h1>
				</header>

			
				<input type="text" placeholder="Enter name" onChange={(text) => {this.handleName(text)}}/>
				<br/>
				<input type="text" placeholder="Enter description" onChange={(text) => {this.handleDescription(text)}}/>
				<br/>
				<input type="text" placeholder="Enter welcome message" onChange={(text) => {this.handleWelcome(text)}}/>
				<br/>
				<button onClick={()=>{this.cancel()}} >Cancel</button>
				<button onClick={()=>{this.addOrga()}} >Submit</button>
				<ToastContainer/>
				</div>
    );
  }
}

OrgaForm.propTypes = {
  location: PropTypes.object
}

export default OrgaForm