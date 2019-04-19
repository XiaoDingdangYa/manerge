import React, { Component } from 'react';
import {Route,Switch,withRouter,Redirect } from 'react-router-dom';
import LoadableComponent from '../../utils/LoadableComponent'

const PersonInfo = LoadableComponent(()=>import('../User/PersonInfo'))
const PersonAttendance = LoadableComponent(()=>import('../User/PersonAttendance'))

const Department = LoadableComponent(()=>import('../Department'))

const Attendance = LoadableComponent(()=>import('../Attendance/index'))

const InfoPublish = LoadableComponent(()=>import('../HumanResource/InfoPublish'))
const InfoSearch = LoadableComponent(()=>import('../HumanResource/InfoSearch'))

const Emp = LoadableComponent(()=>import('../Emp'))

const Permission = LoadableComponent(()=>import('../Permission'))

const routerEnter = LoadableComponent(()=>import('../404'))





class ContentMain extends Component {
    constructor(props) {
        super(props);
        this.state={
         
        }
      }
    
    componentWillMount(){
        var _url = sessionStorage.getItem("url")
        console.log(_url)
        var url = this.props.location.pathname
        //console.log(url)
        if(url!=='/Home'){
             this.props.history.push({pathname:'/404'})
            
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path="/User/PersonAttendance" component={PersonAttendance}/>
                <Route exact path="/User/PersonInfo" component={PersonInfo}/>

                <Route exact path="/Department" component={Department}/>

                <Route exact path="/Attendance/index" component={Attendance}/>


                <Route exact path="/HumanResource/InfoPublish" component={InfoPublish}/>
                <Route exact path="/HumanResource/InfoSearch" component={InfoSearch}/>

                <Route exact path="/Emp" component={Emp}/>

                <Route exact path="/Permission" component={Permission}/>
                
                <Route exact path="/404" component={routerEnter}/>

                </Switch>            
        )
    }
}

export default withRouter(ContentMain);


