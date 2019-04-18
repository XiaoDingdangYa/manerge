import React,{Component} from 'react';
import { Table,Input,message } from 'antd';
import {withRouter} from "react-router-dom";
import api from '../../../api/api';

class PersonAttendance extends Component {
    constructor(props) {
        super(props);
        this.state={
          dataSource:[],//考勤信息
        }
      }

    componentDidMount(){
      var _user = sessionStorage.getItem("user");
      //console.log(_user)
      if( _user){
          this.getUserInfo();
      }
    }      

    getUserInfo(){
        var _user = sessionStorage.getItem("user");   
        //console.log(JSON.parse( _user).userId)
        var params = {
          userId: JSON.parse( _user).userId,
        }
        api.getPersonAttend(params).then(res => {
            //console.log(res);
           if(res.code == 0){
             let list=res.content;
             console.log(list)
             var _attendList=[];
             for(let i=0;i<list.length;i++){
               let _key = list.empId
               let _user = list.userId
               let _name = list.empName
               let _dept = list.deptName
               let _up = list.sex
               let _down = list.card
               _attendList.push({'key':_key,'user':_user,'name':_name,'dept':_dept,'up':_up,'down':_down})
            }
             //console.log(_userList)
             this.setState({dataSource:_attendList})
           }else{
             message.error(res.message);
           }
     
         })
    }

    componentWillUnmount = () => {
      this.setState = (state,callback)=>{
        return;
      };
     }

   

 render(){
   const {dataSource} = this.state
    const columns = [ 
     {
      title: '账号',
      dataIndex: 'user',
      key: 'user',
      },{
      title: '姓名', 
      dataIndex: 'name', 
      key: 'name', 
      },{
        title: '部门',
        dataIndex: 'dept',
        key: 'dept',
      },{
        title: '签到',
        dataIndex: 'up',
        key: 'up',
      },{
        title: '签退',
        dataIndex: 'down',
        key: 'down',
      }];
      
     return(
        <Table columns={columns} dataSource={dataSource} scroll={{ x: 1300 }}/>
     )
 }
}


export default withRouter(PersonAttendance);