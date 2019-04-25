import React,{Component} from 'react';
import { Table,message,Button } from 'antd';
import {withRouter} from "react-router-dom";
import api from '../../../api/api';


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state={
          dataSource:[],//考勤信息
          id:this.props.location.search.substr(6)
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
          userId: this.state.id,
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
        <div>
          <Button type="primary" icon="left" style={{ float: 'left', margin: 10 }} onClick={() => this.props.history.goBack() }>返回</Button> 
          <Table columns={columns} dataSource={dataSource} scroll={{ x: 1300 }} style={{clear:'both'}}/>
        </div>
     )
 }
}


export default withRouter(Detail);