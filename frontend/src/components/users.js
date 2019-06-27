import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Http, { OK, BAD_REQUEST} from '../service/http'

class User extends Component{
	constructor(){
		super()
		this.state = {
			users: [],
			redirect:false
		}
	}

	componentWillMount(){
		this.refresh()
	}

	refresh(){
		Http.get('admin/users').then(res=>{
			if (res.status === OK){
				return res.json()
			}else{
					sessionStorage.removeItem('token')
			}
		})
		.then(response => {
			if (response)
				this.setState({users:response})
			}
		)
	}
	addUser(){
		this.setState({redirect:true})
	}

	deleteUser(mail){
		this.setState({refresh:true})
		Http.delete('admin/users?mail='+mail).then(res=>{
			if (res.status === OK){
				toast.success('User deleted', { position: toast.POSITION.TOP_CENTER })
				this.refresh()
			}else if (res.status === BAD_REQUEST){
					return res.json()
			}else{
				sessionStorage.removeItem('token')
				toast.error('Session expired', { position: toast.POSITION.TOP_CENTER })
			}
		})
		.then(response => {
			if (response){
				toast.error(response.message, { position: toast.POSITION.TOP_CENTER })
			}
		}
		)
	}

	updateUser(user){

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
				<ReactTable
          data={this.state.users}
          columns={[
            {
              Header: "Mail",
              accessor: 'mail'
            },
            {
              Header: "Username",
              accessor: 'username'
            },
            {
              Header: 'Name',
              accessor: 'name'
            },
            {
              Header: 'Surname',
              accessor: 'surname'
            },
            {
            	Header:'Actions',
            	Cell: props =>{
            		return(
            			<div>
            			<button onClick={()=>{this.deleteUser(props.original.mail)}} >Delete</button>
            			<button onClick={()=>{console.log('props', props)}} >Update</button>
            			</div>
            			)
            	}
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
				 <div>
				 <button onClick={()=>{this.addUser()}} >Add</button>
				 </div>
				 <ToastContainer/>
			</div>
    );
  }
}

export default User