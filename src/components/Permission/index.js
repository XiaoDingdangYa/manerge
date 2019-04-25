import React,{Component} from 'react';
import { Table, message,Form } from 'antd';
import {withRouter,Link} from "react-router-dom";
import api from '../../api/api';



class Per extends Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],//部门信息数组
            visible:false,
            formSource:[]
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
            this.getRole();
        }
      }   

      getRole(){
        api.getRole().then(res => {
            console.log(res);
           if(res.code == 0){
             let list=res.content;
             //console.log(list)
             var _roleList=[];
             for(let i=0;i<list.length;i++){
               let _roleid = list[i].roleId
               let _name = list[i].roleName
               let _remark = list[i].remark
               let _count = list[i].userNum
               _roleList.push({'roleid':_roleid,'name':_name,'remark':_remark,'count':_count})
             }
             this.setState({dataSource:_roleList})
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
    
    //新增权限用户
    edit = (record) => {
      //console.log(record)
      this.setState({
        formSource:record,
        visible: true
      })
    }



 render(){
   const {dataSource} = this.state
    const columns = [ 
      {
      title: 'ID', 
      dataIndex: 'roleid', 
      key: 'roleid', 
      },{
        title: '角色',
        dataIndex: 'name',
        key: 'name',
      },{
        title: '人数',
        dataIndex: 'count',
        key: 'count',
      },{
        title: '描述',
        dataIndex: 'remark',
        key: 'remark',
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
              <Link to={{pathname:"/Permission/AddRole", search: '?role='+record.roleid, query:{user: 'bar'}  }}>添加用户</Link>
            </span>
          ),
      }];
      
     return(
         <div>
            <Table columns={columns} dataSource={dataSource}/>
        </div>
     )
 }
}
const Permission = Form.create({ name: 'normal_dept' })(Per);
export default withRouter(Permission);