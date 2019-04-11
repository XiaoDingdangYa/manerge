import React, { Component } from 'react';
import {Route,Switch } from 'react-router-dom';
import LoadableComponent from '../../utils/LoadableComponent'

const PersonInfo = LoadableComponent(()=>import('../User/PersonInfo'))
const PersonAttendance = LoadableComponent(()=>import('../User/PersonAttendance'))

const Department = LoadableComponent(()=>import('../Department'))

const Attendance = LoadableComponent(()=>import('../Attendance'))

const HumanResource = LoadableComponent(()=>import('../HumanResource'))

const Emp = LoadableComponent(()=>import('../Emp'))

const Permission = LoadableComponent(()=>import('../Permission'))

const Entry = LoadableComponent(()=>import('../Certificate/Entry'))
const Search = LoadableComponent(()=>import('../Certificate/Search'))



class ContentMain extends Component {
    constructor(props) {
        super(props);
        this.state={
         
        }
      }
    
    componentDidMount(){
    }

    render() {
        return (
            <Switch>
                <Route exact path="/User/PersonAttendance" component={PersonAttendance}/>
                <Route exact path="/User/PersonInfo" component={PersonInfo}/>

                <Route exact path="/Department" component={Department}/>

                <Route exact path="/Attendance" component={Attendance}/>

                <Route exact path="/HumanResource" component={HumanResource}/>

                <Route exact path="/Emp" component={Emp}/>

                <Route exact path="/Permission" component={Permission}/>

                <Route exact path="/Certificate/Entry" component={Entry}/>
                <Route exact path="/Certificate/Search" component={Search}/>

                </Switch>            
        )
    }
}

export default ContentMain;


