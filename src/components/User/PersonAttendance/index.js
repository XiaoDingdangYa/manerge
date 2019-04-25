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

      componentWillMount(){
        var _url = sessionStorage.getItem("url")
        _url = JSON.parse( _url )
        //console.log(_url[0].url)
        var url = this.props.location.pathname
        //console.log(url)
        var statu = true
        for (let i = 0; i < _url.length; i++) {
          if (_url[i].url == url) {
            statu = true
            break
          }else{
            statu = false
          }          
        }
        if(statu==false){
          this.props.history.push({pathname:'/404'});
            
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
        api.getUserAttend(params).then(res => {
            console.log(res);
           if(res.code == 0){
             let list=res.content;
             console.log(list)
             var _attendList=[];
             for(let i=0;i<list.length;i++){
               let _key = list[i].attendId
               let _day = list[i].attendDate
               let _name = list[i].empName
               let _dept = list[i].deptName
               let _up = list[i].attentEvening
               let _down = list[i].attentEvening
               _attendList.push({'key':_key,'day':_day,'name':_name,'dept':_dept,'up':_up,'down':_down})
            }
             console.log(_attendList)
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
      title: '日期',
      dataIndex: 'day',
      key: 'day',
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