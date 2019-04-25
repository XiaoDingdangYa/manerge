import React, { Component } from 'react';
import {Route,Switch,withRouter } from 'react-router-dom';
import LoadableComponent from '../../utils/LoadableComponent'

const PersonInfo = LoadableComponent(()=>import('../User/PersonInfo'))
const PersonAttendance = LoadableComponent(()=>import('../User/PersonAttendance'))

const Department = LoadableComponent(()=>import('../Department'))

const Attendance = LoadableComponent(()=>import('../Attendance'))
const Detail = LoadableComponent(()=>import('../Attendance/Detail'))

const InfoPublish = LoadableComponent(()=>import('../HumanResource/InfoPublish'))
const InfoSearch = LoadableComponent(()=>import('../HumanResource/InfoSearch'))

const Emp = LoadableComponent(()=>import('../Emp'))

const Permission = LoadableComponent(()=>import('../Permission'))
const AddRole = LoadableComponent(()=>import('../Permission/AddRole'))

const routerEnter = LoadableComponent(()=>import('../404'))





class ContentMain extends Component {
    constructor(props) {
        super(props);
        this.state={
         
        }
      }
    


    render() {
        return (
            <Switch>
                <Route exact path="/User/PersonAttendance" component={PersonAttendance}/>
                <Route exact path="/User/PersonInfo" component={PersonInfo}/>

                <Route exact path="/Department" component={Department}/>

                <Route exact path="/Attendance" component={Attendance}/>
                <Route exact path="/Attendance/Detail" component={Detail}/>


                <Route exact path="/HumanResource/InfoPublish" component={InfoPublish}/>
                <Route exact path="/HumanResource/InfoSearch" component={InfoSearch}/>

                <Route exact path="/Emp" component={Emp}/>

                <Route exact path="/Permission" component={Permission}/>
                <Route exact path="/Permission/AddRole" component={AddRole}/>
                
                <Route exact path="/404" component={routerEnter}/>

                </Switch>            
        )
    }
}

export default withRouter(ContentMain);


