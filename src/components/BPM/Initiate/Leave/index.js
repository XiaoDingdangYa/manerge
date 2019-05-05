import React, { Component } from 'react';
import { Button, Form, Col, DatePicker, Input, Select, message } from 'antd';
import './index.css'
import TextArea from 'antd/lib/input/TextArea';
import './../../../../api/api'
import api from './../../../../api/api';

const Option = Select.Option;


class Initiate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:this.props.location.search.substr(6),
      name:'',
      dept:'',
      job:'',
    }
  }

  componentDidMount() {
      this.getUserInfo();   
  }

  getUserInfo = () => {
    var params = {
      userId:this.state.id
    }
    api.getUserInfo(params).then(res => {
      if(res.code == 0){
        let list=res.content;
        console.log(list)
          let _name = list.empName
          let _jobName = list.jobName
          let _dept = list.deptName
        //console.log(_userList)
        this.setState({name:_name,dept:_dept,job:_jobName})
      }else{
        message.error(res.message);
      }
    })
  }




  render() {
    const {id,name,dept,job} = this.state
   const { getFieldDecorator } = this.props.form;
    return (
      <div style={{height:'60vh',width:'80vh',...styles,margin:20}}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Col span={24} style={{...styles}}>
            <Form.Item
            style={{padding:5}}>
                <span style={{fontSize:'2rem'}}>离职申请</span>
            </Form.Item>
          </Col>
          <Col span={12} style={{...styles}}>
              <Form.Item
              label='员工ID'
              style={{padding:5}}>
                <span style={{textAlign:'left'}}>{id}</span>                  
              </Form.Item>
          </Col>
          <Col span={12} style={{...styles}}>
              <Form.Item
              label='姓名'
              style={{padding:5}}>
                <span style={{textAlign:'left'}}>{name}</span>                  
              </Form.Item>
          </Col>
          <Col span={12} style={{...styles}}>
              <Form.Item
              label='部门'
              style={{padding:5}}>
                <span style={{textAlign:'left'}}>{dept}</span>                  
              </Form.Item>
          </Col>
          <Col span={12} style={{...styles}}>
              <Form.Item
              label='入职日期'
              style={{padding:5}}>
                <DatePicker />                 
              </Form.Item>
          </Col>
          <Col span={24} style={{...styles}}>
              <Form.Item
              label='主题'
              style={{padding:5}}>
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入主题!',
                }],         
              })(
                <Input style={{width:500}} />   
              )}             
              </Form.Item>
          </Col>
          <Col span={12} style={{...styles}}>
              <Form.Item
              label='当前岗位'
              style={{padding:5}}>
                  <span style={{textAlign:'left'}}>{job}</span>                  
              </Form.Item>
          </Col>
          <Col span={12} style={{...styles}}>
              <Form.Item
              label='离职日期'
              style={{padding:5}}>
              {getFieldDecorator('leave', {
                rules: [{
                  required: true, message: '请选择离职日期!',
                }],         
              })(
                <DatePicker />   
              )}               
              </Form.Item>
          </Col>
          <Col span={24} style={{...styles}}>
              <Form.Item
              label='离职原因'
              style={{padding:5}}>
              {getFieldDecorator('leave', {
                rules: [{
                  required: true, message: '请选择离职原因!',
                }],         
              })(
                <Select style={{width:160}}>
                <Option value=''>  </Option>
                <Option value='发展空间'>发展空间</Option>
                <Option value='身体原因'>身体原因</Option>
                <Option value='家庭原因'>家庭原因</Option>
                <Option value='薪酬待遇'>薪酬待遇</Option>
                <Option value='团队关系'>团队关系</Option>
                <Option value='工作缺乏挑战'>工作缺乏挑战</Option>
                <Option value='工作得不到认可'>工作得不到认可</Option>
                <Option value='其他'>其他</Option>
              </Select>  
              )}                
              </Form.Item>
          </Col>
          <Col span={24} style={{...styles}}>
              <Form.Item
              label='离职详细说明'
              style={{padding:5}}>
                <TextArea rows={4} cols={100}/>            
              </Form.Item>
          </Col>
          <Col span={24}>
              <Form.Item
              style={{padding:5}}>
                <Button type="primary" htmlType="submit" style={{float:"right",marginLeft:650,marginTop:70}}>提交</Button>        
              </Form.Item>
          </Col>
        </Form>
        </div>

    )
  }
}

var styles={
  borderStyle:'solid',
  borderWidth:1,
  borderColor:'black',
  marginTop: -1,
  borderColor:'rgb(180,204,238)'
}

const Leave = Form.create({ name: 'normal_leave' })(Initiate);

export default Leave;