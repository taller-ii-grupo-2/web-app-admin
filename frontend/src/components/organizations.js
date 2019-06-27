import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Http, { OK, BAD_REQUEST} from '../service/http'

class Orga extends Component{
	constructor(){
		super()
		this.state = {
			orgas: [],
			redirect: false,
      redirectUpdate: false,
      dataUpdate: {},
      redirectWords: false,
      dataWords: {},
      redirectIndex: false
		}
	}

	componentWillMount(){
		this.refresh()
	}

	refresh(){
		Http.get('admin/orgas').then(res=>{
			if (res.status === OK){
				return res.json()
			}else{
					sessionStorage.removeItem('token')
			}
		})
		.then(response => {
			if (response)
				this.setState({orgas:response})
			}
		)
	}
	addInvalidWord(name) {
    this.setState({ redirectWords: true })
    this.setState({ dataWords: { name: name } })
  }
  
	deleteOrga(name){
		Http.delete('admin/orgas?name='+name).then(res=>{
			if (res.status === OK){
				toast.success('Orga deleted', { position: toast.POSITION.TOP_CENTER })
				this.refresh()
			}else if (res.status === BAD_REQUEST) {
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

	updateOrga(name) {
		this.setState({ redirectUpdate: true })
    this.setState({ dataUpdate: { name: name } })
	}

	addBot() {
	}

	goToIndex() {
		this.setState({ redirectIndex: true })
	}

  render() {
  	if (!sessionStorage.getItem('token')){
  		return <Redirect to='/login' />;
  	}
  	if (this.state.redirect){
  		return <Redirect to='/orgas/form' />;
    }

    if (this.state.redirectIndex){
  		return <Redirect to='/index' />;
    }

    if (this.state.redirectUpdate){
    	return <Redirect to={{
        pathname: '/orgas/update_form',
        state: { id: this.state.dataUpdate }
      }}
      />
    }

    if (this.state.redirectWords){
    	return <Redirect to={{
        pathname: '/orgas/words_form',
        state: { id: this.state.dataWords }
      }}
      />
    }

    return (
    	<div className="User">
				<header className="User-header">
					<h1 className="Orgas-title"> Orgas </h1>
				</header>
				<ReactTable
          data={this.state.orgas}
          columns={[
            {
              Header: "Name",
              accessor: 'name'
            },
            {
              Header: "Creator",
              accessor: 'creator'
            },
            {
              Header: 'Description',
              accessor: 'description'
            },
            {
              Header: 'Welcome message',
              accessor: 'welcome'
            },
            {
            	Header:'Actions',
            	Cell: props =>{
            		return(
            			<div>
            			<button onClick={()=>{this.deleteOrga(props.original.name)}} >Delete</button>
            			<button onClick={()=>{this.updateOrga(props.original.name)}} >Update</button>
            			<button onClick={()=>{this.addBot()}} >Create Bot</button>
            			<button onClick={()=>{this.addInvalidWord(props.original.name)}} >Add invalid word</button>
            			</div>
            			)
            	}
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <button onClick={()=>{this.goToIndex()}} >Index</button>
				 <ToastContainer/>
			</div>
    );
  }
}

export default Orga