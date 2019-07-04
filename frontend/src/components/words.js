import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Http, { OK, BAD_REQUEST} from '../service/http'

class Word extends Component{
	constructor(){
		super()
		this.state = {
			words: [],
			redirect: false,
      redirectUpdate: false,
      dataUpdate: {},
      redirectUpdate: false
		}
	}

	componentWillMount(){
		this.refresh()
	}

	refresh(){
		Http.get('organizations/invalidwords').then(res=>{
			if (res.status === OK){
				return res.json()
			}else{
					sessionStorage.removeItem('token')
			}
		})
		.then(response => {
			if (response)
				this.setState({words:response})
			}
		)
    .catch(err =>{
      alert(err)
    })
	}
  
	updateWord(name) {
		this.setState({ redirectUpdate: true })
    this.setState({ dataUpdate: { name: name } })
	}

  goToIndex() {
    this.setState({redirectIndex: true})
  }


  render() {
  	if (!sessionStorage.getItem('token')){
  		return <Redirect to='/login' />;
  	}
  	if (this.state.redirect){
  		return <Redirect to='/orgas/words_form' />;
    }

    if (this.state.redirectIndex){
      return <Redirect to='/index' />;
    }

    if (this.state.redirectUpdate){

    	return <Redirect to={{
        pathname: '/orgas/words_form',
        state: { id: this.state.dataUpdate }
      }}
      />
    }

    return (
    	<div className="User">
				<header className="User-header">
					<h1 className="Words-title"> Words </h1>
				</header>
				<ReactTable
          data={this.state.words}
          columns={[
            {
              Header: "Name",
              accessor: 'orga'
            },
            {
              Header: "Words",
              accessor: 'words'
            },
            {
            	Header:'Actions',
            	Cell: props =>{
            		return(
            			<div>
            			<button onClick={()=>{this.updateWord(props.original.orga)}} >Change</button>
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

export default Word