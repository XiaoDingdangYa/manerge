import React,{Component} from 'react';
import { Table,Input,message } from 'antd';
import {withRouter} from "react-router-dom";
import api from './../../../api/api';


const Search = Input.Search;

class PersonInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
          dataSource:[],//个人信息
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
        api.getUserInfo(params).then(res => {
            //console.log(res);
           if(res.code == 0){
             let list=res.content;
             //console.log(list)
             var _userList=[];
               let _key = list.empId
               let _name = list.empName
               let _age = list.age
               let _sex = list.sex
               let _card = list.card
               let _jobName = list.jobName
               let _dept = list.dept
               let _phone = list.phone
               let _email = list.email
               _userList.push({'key':_key,'name':_name,'age':_age,'sex':_sex,'card':_card,'jobName':_jobName,'dept':_dept,'phone':_phone,'email':_email})
             
             console.log(_userList)
             this.setState({dataSource:_userList})
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
      title: '姓名', 
      width: 100, 
      dataIndex: 'name', 
      key: 'name', 
      fixed: 'left',
      },{
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },{
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },{
        title: '身份证号',
        dataIndex: 'card',
        key: 'card',
      },{
        title: '职位',
        dataIndex: 'jobName',
        key: 'jobName',
      },{
        title: '所属部门',
        dataIndex: 'dept',
        key: 'dept',
      },{
        title: '手机号码',
        dataIndex: 'phone',
        key: 'phone',
      },{
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      }];
      
     return(
        <Table columns={columns} dataSource={dataSource} scroll={{ x: 1300 }}/>
     )
 }
}


export default withRouter(PersonInfo);