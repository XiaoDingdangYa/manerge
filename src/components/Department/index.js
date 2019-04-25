import React,{Component} from 'react';
import { Table, Button, Input, Divider, message,Form,Modal,Popconfirm,notification,Icon } from 'antd';
import {withRouter} from "react-router-dom";
import api from '../../api/api';

const Search = Input.Search;


class Departmentt extends Component {
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
            this.getDeptInfo();
        }
      }   

      getDeptInfo(){
        api.getDeptInfo().then(res => {
            //console.log(res);
           if(res.code == 0){
             let list=res.content;
             //console.log(list)
             var _deptList=[];
             for(let i=0;i<list.length;i++){
               let _key = list[i].deptId
               let _name = list[i].deptName
               let _remark = list[i].deptRemark
               let _count = list[i].count
               _deptList.push({'key':_key,'name':_name,'remark':_remark,'count':_count})
             }
             this.setState({dataSource:_deptList})
           }else{
             message.error(res.message);
           }
     
         })
    }

    search = (value)=>{
      var teacherList
      if(value){
        teacherList = this.state.dataSource.filter(array => array.name.match(value));
        this.setState({dataSource:teacherList})
      }else{
        this.getDeptInfo()
      }
      
    }

    componentWillUnmount = () => {
      this.setState = (state,callback)=>{
        return;
      };
    }
    
    //编辑部门信息
    edit = (record) => {
      console.log(record)
      this.setState({
        formSource:record,
        visible: true
      })
    }

    //删除部门信息
    delete = (record) => {
      console.log(record)
      var params = {
        deptId: record.key,
      }
      if(record.count>0){
        notification.open({
          message: '删除错误',
          description: '该部门旗下还有员工，无法删除',
          icon: <Icon type="close-circle" style={{color:"red"}} />,
        });
      }else{
        api.deleteDept(params).then(res =>{
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
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          var params = {
            deptId:values.key,
            deptName:values.name,
            deptRemark:values.remark
          };  
          api.addDept(params).then(res =>{
             //console.log(res);
            if(res.code == 0){
              message.success('提交成功！')
              setTimeout(() => {
                window.location.reload(true);
              }, 1500);
            }else{
              message.error(res.err);
            }
          })
        }
      });
    }

 render(){
   const {dataSource,formSource,visible} = this.state
   const { getFieldDecorator } = this.props.form;
   const { TextArea } = Input;
    const columns = [ 
    {
      title: 'ID', 
      dataIndex: 'key', 
      key: 'key', 
      },{
      title: '部门名称', 
      dataIndex: 'name', 
      key: 'name', 
      },{
        title: '部门描述',
        dataIndex: 'remark',
        key: 'remark',
      },{
        title: '员工总数',
        dataIndex: 'count',
        key: 'count',
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
              <a href="javascript:void(0)"onClick={() => this.edit(record)}>Edit</a>
              <Divider type="vertical" />
              <Popconfirm title="确认删除该部门?" onConfirm={() => this.delete(record)} okText="确认" cancelText="取消">
                <a href="#">Delete</a>
              </Popconfirm>
            </span>
          ),
      }];
      
     return(
         <div>
             <div style={{marginBottom:20}}>
             <Button type="primary" icon="plus-circle" style={{float:'left',marginLeft:20,marginTop:5}} onClick={() =>this.setState({visible:true,formSouece:[]})}>新增部门</Button>
                <Search
                    placeholder="部门名称"
                    enterButton="搜索"
                    size="large"
                    onSearch={this.search}
                    style={{float:'left',width:500,marginLeft:200}}
                />
            </div>
            <Table columns={columns} dataSource={dataSource} style={{clear:'both'}}/>

  {visible&&<Modal
            title="部门信息"
            visible={visible}
            wrapClassName="vertical-center-modal"
            footer={null}
            onCancel={() => this.setState({visible: false,formSource:[]})}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="ID" style={{display:'none'}}>
            {getFieldDecorator('key', {
                initialValue: formSource.key ||''              
              })(
                <Input type="text" style={{ width: 120 }} />
              )}
            </Form.Item>
            <Form.Item
            label="部门名称">
            {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入部门名称!',
                }],
                initialValue: formSource.name ||''              
              })(
                <Input type="text" style={{ width: 120 }}/>
              )}
            </Form.Item>
            <Form.Item
              label="部门描述"
            >
              {getFieldDecorator('remark', {
                rules: [{
                  required: true, message: '请输入部门描述!',
                }],
                initialValue: formSource.remark ||''
              })(
                <TextArea rows={4} />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{float:'right'}}>
                     保存
              </Button>
            </Form.Item>
          </Form>
      </Modal>
  }
        </div>
     )
 }
}
const Department = Form.create({ name: 'normal_dept' })(Departmentt);
export default withRouter(Department);