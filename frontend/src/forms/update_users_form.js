import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import Http, { OK, BAD_REQUEST} from '../service/http'
import PropTypes from 'prop-types'

class UpdateUsersForm extends Component {
	constructor(){
		super()
		this.state = {
			name: '',
			surname: '',
			username: '',
			redirect:false
		}
	}

	handleName(text) {
		this.setState({name:text.target.value})
	}

	handleSurname(text) {
		this.setState({surname:text.target.value})
	}

	handleUserName(text) {
		this.setState({username:text.target.value})
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

	updateUser() {
		let data = {}
		data.name = this.state.name
		data.username = this.state.username
		data.surname = this.state.surname
    // data = this.filterEmptyFields(data)
    data['mail'] = this.props.location.state.id.mail
		Http.put('admin/users', data)
		.then(res => {
			if (res.status === OK){
				this.setState({redirect: true})
				toast.success('User added', { position: toast.POSITION.TOP_CENTER })
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
  		return <Redirect to='/users' />;
  	}

    return (
    	<div className="UserForm">
				<header className="UserForm-header">
					<h1 className="UserForm-title"> Modify user {this.props.location.state.id.mail}</h1>
				</header>
				<input type="text" placeholder="Enter name" onChange={(text) => {this.handleName(text)}}/>
				<br/>
				<input type="text" placeholder="Enter surname" onChange={(text) => {this.handleSurname(text)}}/>
				<br/>
				<input type="text" placeholder="Enter username" onChange={(text) => {this.handleUserName(text)}}/>
				<br/>
				<button onClick={()=>{this.cancel()}} >Cancel</button>
				<button onClick={()=>{this.updateUser()}} >Submit</button>
				<ToastContainer/>
				</div>
    );
  }
}

UpdateUsersForm.propTypes = {
  location: PropTypes.object
}


export default UpdateUsersForm