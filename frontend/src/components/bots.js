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
			bots: [],
			redirect: false,
      redirectBot: false,
      redirectIndex: false
		}
	}

	componentWillMount(){
		this.refresh()
	}

	refresh(){
		Http.get('admin/bots').then(res=>{
			if (res.status === OK){
				return res.json()
			}else{
					sessionStorage.removeItem('token')
			}
		})
		.then(response => {
			if (response)
				this.setState({bots:response})
			}
		)
	}

  addBot(){
    this.setState({ redirectBot: true })
  }

  
	deleteBots(name){
		Http.delete('admin/bots?name='+name).then(res=>{
			if (res.status === OK){
				toast.success('Bots deleted', { position: toast.POSITION.TOP_CENTER })
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

	goToIndex() {
		this.setState({ redirectIndex: true })
	}

  render() {
  	if (!sessionStorage.getItem('token')){
  		return <Redirect to='/login' />;
  	}

    if (this.state.redirectIndex){
  		return <Redirect to='/index' />;
    }

    if (this.state.redirectBot){
     return <Redirect to={{
        pathname: "/orgas/bots_form",
        state: { id: {name: ''} }
      }}
      />
    }

    return (
    	<div className="Bot">
				<header className="Bot-header">
					<h1 className="Bot-title"> Botss </h1>
				</header>
				<ReactTable
          data={this.state.bots}
          columns={[
            {
              Header: "Bot",
              accessor: 'name'
            },
            {
              Header: "Organization",
              accessor: 'org_id'
            },
            {
              Header: "URL",
              accessor: 'url'
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
        <button onClick={()=>{this.addBot()}} >Add</button>
        <br />
        <button onClick={()=>{this.goToIndex()}} >Index</button>
				 <ToastContainer/>
			</div>
    );
  }
}

export default Bots