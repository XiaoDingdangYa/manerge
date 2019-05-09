import { Button, Divider, Form, Input, InputNumber, message, Modal, Popconfirm, Select, Table, Tag, Radio } from 'antd';
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
        for (let i = 0; i < list.length; i++) {
          let _key = list[i].processInstanceId
          let _name = list[i].startName
          let _title = list[i].title
          let _describtion = list[i].describtion
          _empList.push({ 'key': _key, 'name': _name, 'title': _title, 'describtion': _describtion })
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

 
  selectRow = (e) =>{
    console.log(e)
  }

 
  agree = (record) =>{
    var params = {
      HandleName:this.state.userSource,
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
      name:this.state.userSource
    }
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
    const { dataSource,formSource,visible } = this.state
    const Search = Input.Search;
    const Option = Select.Option;
    const columns = [
      {
        title: '申请人',
        width: 100,
        dataIndex: 'name',
        render: text => <a href="#">{text}</a>,
      }, {
        title: '主题',
        dataIndex: 'title',
        key: 'title',
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
          onCancel={() => this.setState({ visible: false,formSource:[] })}>
          
          <Form onSubmit={this.handleSubmit}>
          <Form.Item
              label="id"
              style={{display:'none'}}>
              {getFieldDecorator('key', {
                initialValue: formSource.key ||''
              }
              )(
                <Input type="text" style={{ width: 120 }} />
              )}
            </Form.Item>
            <Form.Item
              label="姓名">
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入姓名!',
                }],
                initialValue: formSource.name ||''
              }
              )(
                <Input type="text" style={{ width: 120 }} />
              )}
            </Form.Item>
            <Form.Item
              label="年龄"
            >
              {getFieldDecorator('age', {
                rules: [{
                  required: true, message: '请输入年龄!',
                }],
                initialValue: formSource.age ||''
              })(
                <InputNumber />
              )}
            </Form.Item>
            <Form.Item
              label="性别"
            >
            {getFieldDecorator('sex', {
                rules: [{
                  required: true, message: '请选择性别!',
                }],
                initialValue: formSource.sex ||''
              })(
                <Radio.Group>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </Radio.Group>
              )}
              
            </Form.Item>
            <Form.Item
              label="身份证号"
            >
              {getFieldDecorator('card', {
                rules: [{
                  required: true, message: '请输入身份证号!',
                }],
                initialValue: formSource.card ||''
              })(
                <Input type="text" style={{ width: 200 }} />
              )}
            </Form.Item>
            <Form.Item
              label="手机号码"
            >
              {getFieldDecorator('phone', {
                rules: [{
                  required: true, message: '请填写手机号码!',
                }, {
                  minlength: 11, message: '手机号码为11位字符'
                }, {
                  validator: this.isPhone,
                }],
                initialValue: formSource.phone ||''
              })(
                <Input type="number" style={{ width: 120 }} />
              )}
            </Form.Item>
            <Form.Item
              label="邮箱"
            >
              {getFieldDecorator('email', {
                rules: [{
                  required: true, message: '请填写邮箱!',
                }],
                initialValue: formSource.email ||''
              })(
                <Input type="email" style={{ width: 180 }} />
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

const Mine = Form.create({ name: 'normal_bpmM' })(mine);
export default withRouter(Mine);