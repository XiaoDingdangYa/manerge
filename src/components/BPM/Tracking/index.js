import {  Form, Input, message, Modal, Select, Table, Col, Timeline } from 'antd';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import api from './../../../api/api';




class track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible: false,
      userSource:'',
      infor:[],
      assignee:'',
      status:false,
      leval2:false,
      end:false,
      leval3:false
    }
  }



  componentDidMount() {
    var _user = sessionStorage.getItem("user");
    console.log(_user)
    if (_user) {
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
        console.log(res);
       if(res.code == 0){
         let list=res.content;
        let _name = list.empName
         this.setState({userSource:_name}, ()=>{
            this.selectBpmTask()
         })
       }else{
         message.error(res.message);
       }
 
     })
}

  //获取待办任务
  selectBpmTask() {
      var params = {
        name:this.state.userSource
      }
      console.log(params)
    api.selectBpmTask(params).then(res => {
      console.log(res);
      if (res.code == 0) {
        let list = res.content;
        console.log(list)
        var _empList = [];
        for (let i = 0; i < list.length; i++) {
          let _key = list[i].processInstanceId
          let _name = list[i].startName
          let _title = list[i].infor.title
          let _infor = list[i].infor
          let _status = list[i].status
          let _procedureList = list[i].procedureList
          if(_status == 0){
            _status = '进行中'
          }else{
            _status = '已完成'
          }
          _empList.push({ 'key': _key, 'name': _name, 'title': _title, 'infor':_infor , 'status':_status, 'procedureList':_procedureList })
        }
        this.setState({ dataSource: _empList })
      } else {
        message.error(res.message);
      }

    })
  }






  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };

  }

 
  selectRow = (record) =>{
    var index1 = 0 
    this.setState({visible:true,infor:record.infor})
    console.log(record)
    for(let i=0;i<record.procedureList.length;i++){
      if(record.procedureList[i].activityId == '_5'){
        index1 = 1
      }
    }
    for(let i=0;i<record.procedureList.length;i++){
      if(record.procedureList[i].activityId == '_4'){
        this.setState({assignee:record.procedureList[i].assignee})
      }else if(record.procedureList[i].activityId == '_5'){
        this.setState({status:true,leval2:true})
      }else if(record.procedureList[i].activityId == '_6'&& record.status == '已完成' && index1 == 0){
        this.setState({status:false,leval2:true})
      }else if(record.procedureList[i].activityId == '_6' && record.status == '已完成' && index1 == 1){
        this.setState({end:true,leval3:true})
      }else if(record.procedureList[i].activityId == '_11'){
        this.setState({status:false,leval3:true})
      }
    }
    
  }



  render() {
    const { dataSource,infor,visible,assignee,status,leval2,end,leval3 } = this.state
    const Search = Input.Search;
    const Option = Select.Option;
    const columns = [
      {
        title: '申请人',
        width: 100,
        dataIndex: 'name',
        render: (text,record) => <a href="javascript:void(0)" onClick={() => this.selectRow(record)}>{text}</a>,
      }, {
        title: '主题',
        
        dataIndex: 'title',
        key: 'title',
      }, {
        title: '审批状态',
        
        dataIndex: 'status',
        key: 'status',
      } ];
    const { getFieldDecorator } = this.props.form;


    
    //console.log(formSource)


    return (
      <div>
        <Table columns={columns} dataSource={dataSource} scroll={{ x: 1300 }} style={{ clear: 'both' }} 
        onRow={(record) => ({
          onClick: () => {
            this.selectRow(record);
          },
        })}/>

{visible && <Modal
          title="信息录入"
          visible={visible}
          wrapClassName="vertical-center-modal"
          footer={null}
          onCancel={() => this.setState({ visible: false,infor:[] })}>
          
          <Form layout="inline" style={{height:500}}>
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
                <span style={{textAlign:'left'}}>{infor.empId||'无'}</span>       
              </Form.Item>
          </Col>
          <Col span={12} style={{...styles}}>
              <Form.Item
              label='姓名'
              style={{padding:5}}>
                <span style={{textAlign:'left'}}>{infor.empName||'无'}</span>                  
              </Form.Item>
          </Col>
          <Col span={12} style={{...styles}}>
              <Form.Item
              label='部门'
              style={{padding:5}}>
                <span style={{textAlign:'left'}}>{infor.dept||'无'}</span>                  
              </Form.Item>
          </Col>
          <Col span={12} style={{...styles}}>
              <Form.Item
              label='入职日期'
              style={{padding:5}}>
              <span style={{textAlign:'left'}}>{infor.in||'无'}</span>               
              </Form.Item>
          </Col>
          <Col span={24} style={{...styles}}>
              <Form.Item
              label='主题'
              style={{padding:5}}>
              <span style={{textAlign:'left'}}>{infor.title||'无'}</span>            
              </Form.Item>
          </Col>
          <Col span={12} style={{...styles}}>
              <Form.Item
              label='当前岗位'
              style={{padding:5}}>
                  <span style={{textAlign:'left'}}>{infor.job||'无'}</span>                  
              </Form.Item>
          </Col>
          <Col span={12} style={{...styles}}>
              <Form.Item
              label='离职日期'
              style={{padding:5}}>
             <span style={{textAlign:'left'}}>{infor.leave||'无'}</span>               
              </Form.Item>
          </Col>
          <Col span={24} style={{...styles}}>
              <Form.Item
              label='离职原因'
              style={{padding:5}}>
              <span style={{textAlign:'left'}}>{infor.describtion||'无'}</span>          
              </Form.Item>
          </Col>
          <Col span={24} style={{...styles}}>
              <Form.Item
              label='离职详细说明'
              style={{padding:5}}>
              <span style={{textAlign:'left'}}>{infor.detailres||'无'}</span>            
              </Form.Item>
          </Col>
          <Col span={24} style={{padding:5}}>
          <Timeline>
            <Timeline.Item color="green">{infor.empName||'无'}</Timeline.Item>
            {leval2 && <Timeline.Item color={status?'green':'red'}>{assignee}</Timeline.Item>}
            {leval3 && <Timeline.Item color={end?'green':'red'}>gouli</Timeline.Item>}
            {leval3 && <Timeline.Item color={end?'green':'red'}>已完结</Timeline.Item>}
          </Timeline>
          </Col>
        </Form>
        </Modal>
        }
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
const Tracking = Form.create({ name: 'normal_bpmT' })(track);
export default withRouter(Tracking);