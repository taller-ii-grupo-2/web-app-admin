import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Http, { OK, BAD_REQUEST} from '../service/http'

class Bots extends Component{
	constructor(){
		super()
		this.state = {
			Botss: [],
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
		// Http.get('admin/Botss').then(res=>{
		// 	if (res.status === OK){
		// 		return res.json()
		// 	}else{
		// 			sessionStorage.removeItem('token')
		// 	}
		// })
		// .then(response => {
		// 	if (response)
		// 		this.setState({Botss:response})
		// 	}
		// )
	}

  
	deleteBots(name){
		// Http.delete('admin/Botss?name='+name).then(res=>{
		// 	if (res.status === OK){
		// 		toast.success('Bots deleted', { position: toast.POSITION.TOP_CENTER })
		// 		this.refresh()
		// 	}else if (res.status === BAD_REQUEST) {
		// 			return res.json()
		// 	}else{
		// 		sessionStorage.removeItem('token')
		// 		toast.error('Session expired', { position: toast.POSITION.TOP_CENTER })
		// 	}
		// })
		// .then(response => {
		// 	if (response){
		// 		toast.error(response.message, { position: toast.POSITION.TOP_CENTER })
		// 	}
		// }
		// )
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
  		return <Redirect to='/Botss/form' />;
    }

    if (this.state.redirectIndex){
  		return <Redirect to='/index' />;
    }

    if (this.state.redirectUpdate){
    	return <Redirect to={{
        pathname: '/Botss/update_form',
        state: { id: this.state.dataUpdate }
      }}
      />
    }

    if (this.state.redirectWords){
    	return <Redirect to={{
        pathname: '/Botss/words_form',
        state: { id: this.state.dataWords }
      }}
      />
    }

    return (
    	<div className="User">
				<header className="User-header">
					<h1 className="Botss-title"> Botss </h1>
				</header>
				<ReactTable
          data={[]}
          columns={[
            {
              Header: "Bot",
              accessor: 'name'
            },
            {
              Header: "Organization",
              accessor: 'creator'
            },
            {
            	Header:'Actions',
            	Cell: props =>{
            		return(
            			<div>
            			<button onClick={()=>{this.deleteBots(props.original.name)}} >Delete</button>
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

export default Bots