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
      redirect: false,
      redirectToUpdate: false,
      dataRedirectToUpdate: {},
      urlToRedirectToUpdate: '/users/update/form',
      redirectToOrgaForm: false,
      dataRedirectOrga: {},
      urlRedirectToOrgaForm: '/orgas/form',
      redirectIndex: false
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
	addUser() {
    this.setState({ redirect: true })
  }
  
	deleteUser(mail){
		Http.delete('admin/users?mail='+mail).then(res=>{
			if (res.status === OK){
				toast.success('User deleted', { position: toast.POSITION.TOP_CENTER })
				this.refresh()
			}else if (res.status === BAD_REQUEST) {
					return res.json()
			}else{
				// sessionStorage.removeItem('token')
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

	updateUser(mail) {
    this.setState({ redirectToUpdate: true })
    this.setState({ dataRedirectToUpdate: { mail: mail } })
	}

	createOrga(mail) {
		this.setState({ redirectToOrgaForm: true })
		this.setState({ dataRedirectOrga: { mail: mail } })
	}

  goToIndex(){
    this.setState({ redirectIndex: true })
  }

  render() {
  	if (!sessionStorage.getItem('token')){
  		return <Redirect to='/login' />;
  	}
  	if (this.state.redirect){
  		return <Redirect to='/users/form' />;
    }

    if (this.state.redirectIndex){
      return <Redirect to='/index' />;
    }

    if (this.state.redirectToUpdate) {
      return <Redirect to={{
        pathname: this.state.urlToRedirectToUpdate,
        state: { id: this.state.dataRedirectToUpdate }
      }}
      />
    }

    if (this.state.redirectToOrgaForm){
    	return <Redirect to={{
        pathname: this.state.urlRedirectToOrgaForm,
        state: { id: this.state.dataRedirectOrga }
      }}
      />
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
            			<button onClick={()=>{this.updateUser(props.original.mail)}} >Update</button>
            			<button onClick={()=>{this.createOrga(props.original.mail)}} >Create Organization</button>
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
         <div>
         <button onClick={()=>{this.goToIndex()}} >Index</button>
         </div>
				 <ToastContainer/>
			</div>
    );
  }
}

export default User