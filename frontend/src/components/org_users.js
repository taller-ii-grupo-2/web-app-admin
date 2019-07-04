import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import{XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries} from 'react-vis'
import {  ToastContainer, toast, FontAwesomeCloseButton } from 'react-toastify';
import Http, { OK, BAD_REQUEST} from '../service/http'
import 'react-vis/dist/style.css'

class Graph extends Component{
	constructor(){
		super()
		this.state = {
			data: [],
			redirect: false,
      redirectIndex: false
		}
	}

	componentWillMount(){
		this.refresh()
	}

	refresh(){
		Http.get('admin/orgas_users').then(res=>{
			if (res.status === OK){
				return res.json()
			}else{
					sessionStorage.removeItem('token')
			}
		})
		.then(response => {
      const datos =[]
			if (response)
        response.map(orga =>{
          const organization = {
            x: orga.orga,
            y: orga.users
          }
          datos.push(organization)
        })
				this.setState({data:datos})
			}
		)
    .catch(err =>{
      alert(err)
    })
	}
  
  goToIndex() {
    this.setState({redirectIndex: true})
  }


  render() {
  	if (!sessionStorage.getItem('token')){
  		return <Redirect to='/login' />;
  	}

    if (this.state.redirectIndex){
      return <Redirect to='/index' />;
    }

    return (
    	<div className="Graph">
				<header className="Graph-header">
					<h1 className="Graph-title"> Amount of users per organization </h1>
				</header>
				<XYPlot
          xType='ordinal'
          width={window.innerWidth * 0.8}
          height={500}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries
            color='#f00'
            data={this.state.data}
          />
        </XYPlot>
        <br />
        <button onClick={()=>{this.goToIndex()}} >Index</button>
				 <ToastContainer/>
			</div>
    );
  }
}

export default Graph