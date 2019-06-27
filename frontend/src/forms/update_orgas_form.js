import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import Http, { OK, BAD_REQUEST} from '../service/http'
import PropTypes from 'prop-types'

class UpdateOrgasForm extends Component {
	constructor(){
		super()
		this.state = {
			description: '',
			welcome: '',
			redirect:false
		}
	}

	handleDescription(text){
		this.setState({description:text.target.value})
	}

	handleWelcome(text){
		this.setState({welcome:text.target.value})
	}

	cancel() {
		this.setState({redirect:true})
  }
  
  filterEmptyFields(data) {
    let filteredData = {}
    for (let field in data) {
      if (data[field].length === 0) continue
      filteredData[field] = data[field]
    }
    return filteredData
  }

	updateOrga() {
		let obj = {}
		obj.name = this.props.location.state.id.name
		obj.description = this.state.description
		obj.welcomMsg = this.state.welcome
		Http.put('admin/orgas', obj)
		.then(res => {
			if (res.status === OK){
				this.setState({redirect: true})
				toast.success('Orga updated', { position: toast.POSITION.TOP_CENTER })
			}
			return res.json()
		})
		.then(response => {
			if (!this.state.redirect) {
				if (response){
					toast.error(response.message, { position: toast.POSITION.TOP_CENTER })
				} else {
					toast.error('Session expired', { position: toast.POSITION.TOP_CENTER })
					sessionStorage.removeItem('token')
				}
			}
    })
    .catch(err => {
    	alert(err)
    	toast.error(err, { position: toast.POSITION.TOP_CENTER })
    })	
	}

  render() {
  	if (!sessionStorage.getItem('token')) {
  		return <Redirect to='/login' />;
  	}
  	if(this.state.redirect){
  		return <Redirect to='/organizations' />;
  	}

    return (
    	<div className="OrgaForm">
				<header className="OrgaForm-header">
					<h1 className="OrgaForm-title"> Modify orga {this.props.location.state.id.name}</h1>
				</header>
				<input type="text" placeholder="Enter description" onChange={(text) => {this.handleDescription(text)}}/>
				<br/>
				<input type="text" placeholder="Enter welcome message" onChange={(text) => {this.handleWelcome(text)}}/>
				<br/>
				<button onClick={()=>{this.cancel()}} >Cancel</button>
				<button onClick={()=>{this.updateOrga()}} >Submit</button>
				<ToastContainer/>
				</div>
    );
  }
}

UpdateOrgasForm.propTypes = {
  location: PropTypes.object
}


export default UpdateOrgasForm