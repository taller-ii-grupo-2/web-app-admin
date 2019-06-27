import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import Http, { OK, BAD_REQUEST} from '../service/http'
import PropTypes from 'prop-types'

class WordForm extends Component{
	constructor(){
		super()
		this.state = {
			word: '',
			redirect:false
		}
	}

	handleWord(text){
		this.setState({word:text.target.value})
	}

	cancel(){
		this.setState({redirect:true})
	}

	addWord(){
		let obj = {}
		obj.org_name = this.props.location.state.id.name
		obj.word = this.state.word

		Http.post('organizations/invalidwords',obj)
		.then(res => {
			if (res.status === OK){
				this.setState({redirect: true})
				toast.success('Word added', { position: toast.POSITION.TOP_CENTER })
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

		deleteWord(){
		let obj = {}
		obj.org_name = this.props.location.state.id.name
		obj.word = this.state.word

		Http.delete('organizations/invalidwords',obj)
		.then(res => {
			if (res.status === OK){
				this.setState({redirect: true})
				toast.success('Word deleted', { position: toast.POSITION.TOP_CENTER })
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
    .catch(err =>{
      alert(err)
    })	
	}

  render() {
  	if (!sessionStorage.getItem('token')){
  		return <Redirect to='/login' />;
  	}
  	if(this.state.redirect){
  		return <Redirect to='/orgas/words' />;
  	}

    return (
    	<div className="WordForm">
				<header className="WordForm-header">
					<h1 className="WordForm-title"> Change word for {this.props.location.state.id.name} </h1>
				</header>

			
				<input type="text" placeholder="Enter  invalid word" onChange={(text) => {this.handleWord(text)}}/>
				<br/>
				<button onClick={()=>{this.cancel()}} >Cancel</button>
				<button onClick={()=>{this.deleteWord()}} >Delete</button>
				<button onClick={()=>{this.addWord()}} >Add</button>
				<ToastContainer/>
				</div>
    );
  }
}

WordForm.propTypes = {
  location: PropTypes.object
}

export default WordForm
