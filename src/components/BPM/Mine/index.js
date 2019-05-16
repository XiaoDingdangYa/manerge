import { Button, Divider, Form, Input, Col, message, Modal, Popconfirm, Select, Table, Tag, Radio } from 'antd';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import api from './../../../api/api';




class mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible: false,
      userSource:'',
      infor:[],
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
            this.bpmSelect()
         })
       }else{
         message.error(res.message);
       }
 
     })
}

  //获取待办任务
  bpmSelect() {
      var params = {
        name:this.state.userSource
      }
      console.log(params)
    api.bpmSelect(params).then(res => {
      console.log(res);
      if (res.code == 0) {
        let list = res.content;
        console.log(list)
        var _empList = [];
        var _inforList = [];
        for (let i = 0; i < list.length; i++) {
          let _key = list[i].processInstanceId
          let _name = list[i].startName
          let _title = list[i].infor.title
          let _describtion = list[i].describtion
          let _status = list[i].status
          let _infor = list[i].infor
          if(_status == 0){
            _status = '进行中'
          }else{
            _status = '已完成'
          }
          _empList.push({ 'key': _key, 'name': _name, 'title': _title, 'describtion': _describtion, 'status':_status, 'infor':_infor })
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
    this.setState({visible:true,infor:record.infor})
    console.log(record)
  }

 
  agree = (record) =>{
    var params = {
      handleName:this.state.userSource,
      startName:record.name
    }
    console.log(params)
    api.bpmAgree(params).then(res =>{
      if(res.code == 0){
        message.success('审批成功！')
        setTimeout(() => {
          window.location.reload(true);
        }, 1500);
      }else{
        message.error(res.err);
      }
    }

    )
  }

  disagree = (record) =>{
    var params = {
      handleName:this.state.userSource,
      startName:record.name
    }
    //console.log(params)
    api.bpmDisagree(params).then(res =>{
      if(res.code == 0){
        message.success('该申请已拒绝！')
        setTimeout(() => {
          window.location.reload(true);
        }, 1500);
      }else{
        message.error(res.err);
      }
    }

    )
  }



  render() {
    const { dataSource,infor,visible } = this.state
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
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:void(0)"onClick={() => this.agree(record)}>同意</a>
            <Divider type="vertical" />
            <a href="javascript:void(0)"onClick={() => this.disagree(record)}>拒绝</a>
          </span>
        ),
      }];
    const { getFieldDecorator } = this.props.form;


    
    //console.log(formSource)


    return (
      <div>
        <Table columns={columns} dataSource={dataSource} scroll={{ x: 1300 }} style={{ clear: 'both' }} />

        {visible && <Modal
          title="信息录入"
          visible={visible}
          wrapClassName="vertical-center-modal"
          footer={null}
          onCancel={() => this.setState({ visible: false,infor:[] })}>
          
          <Form layout="inline" style={{height:400}}>
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

const Mine = Form.create({ name: 'normal_bpmM' })(mine);
export default withRouter(Mine);