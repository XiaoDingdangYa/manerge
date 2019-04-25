import React,{Component} from 'react';
import { Table, message,Form,Popconfirm,Button,Modal, Select } from 'antd';
import {withRouter} from "react-router-dom";
import api from '../../../api/api';

const Option = Select.Option;


class AddR extends Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],//部门信息数组
            visible:false,
            formSource:[],
            id:this.props.location.search.substr(6),
            userList:[],
            roleUser:''
        }
      }

      
      componentDidMount(){
        var _user = sessionStorage.getItem("user");
        //console.log(_user)
        if( _user){
            this.getRoleuser();
        }
      }   

      getRoleuser(){
          
        //console.log(this.state.id)
        var params = {
            roleId:this.state.id
          };  
        api.getRoleuser(params).then(res => {
            //console.log(res);
           if(res.code == 0){
             let list=res.content;
             //console.log(list)
             var _userList=[];
             for(let i=0;i<list.length;i++){
               let _user = list[i]
               _userList.push({'key':_user,'user':_user})
             }
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
    


     //删除该权限用户
  delete = (record) => {
    //console.log(record)
    var params = {
      userName: record.user,
      roleId:this.state.id
    }
      api.deleteRole(params).then(res =>{
        //console.log(res);
      if(res.code == 0){
        message.success('删除成功！'); 
        setTimeout(() => {
            window.location.reload(true);
          }, 1500);
      }else{
        message.error('删除失败！');
      }
    })

  }

  add = ()=>{
    this.setState({ visible: true, })
    var params = {
        roleId:this.state.id
      };  
      console.log(params)
    api.addUser(params).then(res => {
        //console.log(res);
       if(res.code == 0){
         let list=res.content;
         console.log(list)
         var _userList=[];
         for(let i=0;i<list.length;i++){
           let _user = list[i]
           _userList.push({'user':_user})
         }
         this.setState({userList:_userList})
       }else{
         message.error(res.message);
       }
 
     })

  }

  handleOk = () => {
    if(this.state.roleUser){
        
        var params = {
            roleId:this.state.id,
            userName:this.state.roleUser
          };  
        api.addRole(params).then(res => {
            //console.log(res);
           if(res.code == 0){
             this.setState({
                visible: false,
            });
            message.success('新增成功')
            setTimeout(() => {
                window.location.reload(true);
              }, 1500);
           }else{
            this.setState({
                visible: false,
            });
             message.error(res.message);
           }
     
         })
    }
    
  }

  handleCancel = ()=>{
    this.setState({
        visible: false,
      });
  }

  change = (value) =>{
      this.setState({roleUser:value})
  }



 render(){
   const {dataSource,visible,userList} = this.state
    const columns = [ 
      {
        title: '用户',
        dataIndex: 'user',
        key: 'user',
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <Popconfirm title="确认删除该用户?" onConfirm={() => this.delete(record)} okText="确认" cancelText="取消">
              <a href="#">Delete</a>
            </Popconfirm>
          ),
      }];
      var userL = [];
      console.log(userList)
      if(userList){
        userL.push(userList.map((item,index)=>
       <Option value={item.user} key={item.user}>{item.user}</Option>
       ))
      }
      
     return(
         <div>
             <div>
                <Button type="primary" icon="left" style={{ float: 'left', marginLeft: 10, marginBottom: 10 }} onClick={() => this.props.history.goBack() }>返回</Button>  
                <Button type="primary" icon="plus-circle" style={{ float: 'left', marginLeft: 10, marginBottom: 10 }} onClick={this.add}>添加成员</Button>               
             </div>
            <Table columns={columns} dataSource={dataSource} style={{ clear: 'both' }}/>
            <Modal
            title="添加成员"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
            <Select style={{ width: 120 }} onChange={this.change}>
                {userL}
            </Select>
            </Modal>
        </div>
     )
 }
}
const AddRole = Form.create({ name: 'normal_dept' })(AddR);
export default withRouter(AddRole);