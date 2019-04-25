import React,{Component} from 'react';
import { Table,message } from 'antd';
import {withRouter, Link} from "react-router-dom";
import api from './../../api/api';


class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state={
          dataSource:[],//考勤信息
          userId:JSON.parse(sessionStorage.getItem("user")).userId
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
      var _user = JSON.parse(sessionStorage.getItem("user"));
      
      if( _user){
          this.getUserInfo();
      }
    }      

    getUserInfo(){
        api.getAllAttend().then(res => {
            console.log(res);
           if(res.code == 0){
             let list=res.content;
             console.log(list)
             var _attendList=[];
             for(let i=0;i<list.length;i++){
               let _key = list[i].userId
               let _user = list[i].userName
               let _name = list[i].empName
               let _dept = list[i].deptName
               let _position = list[i].jobName
               let _attend = list[i].attend
               let _absence = list[i].absence
               _attendList.push({'key':_key,'user':_user,'name':_name,'dept':_dept,'position':_position,'attend':_attend,'absence':_absence})
            }
             //console.log(_userList)
             this.setState({dataSource:_attendList})
           }else{
             message.error(res.message);
           }
     
         })
    }

    detail = (record) => {
      console.log(record)
      var params = {
        userId: record.key,
      }
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
      dataIndex: 'name', 
      key: 'name', 
      },{
        title: '账号',
        dataIndex: 'user',
        key: 'user',
      },{
        title: '部门',
        dataIndex: 'dept',
        key: 'dept',
      },{
        title: '职位',
        dataIndex: 'position',
        key: 'position',
      },{
        title: '出勤',
        dataIndex: 'attend',
        key: 'attend',
      },{
        title: '缺勤',
        dataIndex: 'absence',
        key: 'absence',
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
              <Link to={{pathname:"/Attendance/Detail", search: '?user='+record.key  }}>签到明细</Link>          
            </span>
          ),
      }];
      
     return(
        <Table columns={columns} dataSource={dataSource} scroll={{ x: 1300 }}/>
     )
 }
}


export default withRouter(Attendance);