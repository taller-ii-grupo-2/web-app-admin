import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import Http, { OK, BAD_REQUEST} from '../service/http'
import PropTypes from 'prop-types'

class BotForm extends Component{
	constructor(){
		super()
		this.state = {
			name: '',
			description: '',
			url: '',
			redirect:false
		}
	}

	handleName(text){
		this.setState({name:text.target.value})
	}

	handleDescription(text){
		this.setState({description:text.target.value})
	}

		handleURL(text){
		this.setState({url:text.target.value})
	}

	cancel(){
		this.setState({redirect:true})
	}

	addBot(){
		let obj = {}
		obj.org_name = this.props.location.state.id.name
		obj.name = this.state.name
		obj.url = this.state.url
		obj.description = this.state.description

		Http.post('admin/bots',obj)
		.then(res => {
			if (res.status === OK){
				this.setState({redirect: true})
				toast.success('Bot added', { position: toast.POSITION.TOP_CENTER })
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
  		return <Redirect to='/orgas/bots' />;
  	}

    return (
    	<div className="BotForm">
				<header className="BotForm-header">
					<h1 className="BotForm-title"> Add bot for {this.props.location.state.id.name} </h1>
				</header>
				<input type="text" placeholder="Enter bot name" onChange={(text) => {this.handleName(text)}}/>
				<br/>
				<input type="text" placeholder="Enter url" onChange={(text) => {this.handleURL(text)}}/>
				<br/>
				<input type="text" placeholder="Enter description" onChange={(text) => {this.handleDescription(text)}}/>
				<br/>
				<button onClick={()=>{this.cancel()}} >Cancel</button>
				<button onClick={()=>{this.addBot()}} >Add</button>
				<ToastContainer/>
				</div>
    );
  }
}

BotForm.propTypes = {
  location: PropTypes.object
}

export default BotForm