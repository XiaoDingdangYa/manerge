import { Button, Divider, Form, Input, InputNumber, message, Modal, Popconfirm, Select, Table } from 'antd';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import api from './../../api/api';




class Empp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],//个人信息
      visible: false
    }
  }

  componentDidMount() {
    var _user = sessionStorage.getItem("user");
    //console.log(_user)
    if (_user) {
      this.getEmpInfo();
    }
  }

  //获取所有员工信息
  getEmpInfo() {
    api.getEmpInfo().then(res => {
      //console.log(res);
      if (res.code == 0) {
        let list = res.content;
        console.log(list)
        var _empList = [];
        for (let i = 0; i < list.length; i++) {
          let _key = list[i].empId
          let _name = list[i].empName
          let _age = list[i].age
          let _sex = list[i].sex
          let _card = list[i].card
          let _jobName = list[i].jobName
          let _dept = list[i].deptName
          let _phone = list[i].phone
          let _email = list[i].email
          _empList.push({ 'key': _key, 'name': _name, 'age': _age, 'sex': _sex, 'card': _card, 'jobName': _jobName, 'dept': _dept, 'phone': _phone, 'email': _email })
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

  //身份证号验证
  isIdCardNo = (rule, value, callback) => {
    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4,
      2, 1);
    var varArray = [];
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = value.length;
    var idNumber = value;
    // initialize
    if ((intStrLen != 15) && (intStrLen != 18)) {
      callback('身份证号长度错误!')
    }
    // check and set value
    for (let i = 0; i < intStrLen; i++) {
      varArray[i] = idNumber.charAt(i);
      if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
        callback('错误的身份证号!')
      } else if (i < 17) {
        varArray[i] = varArray[i] * factorArr[i];
      }
    }
    if (intStrLen == 18) {
      // check date
      var date8 = idNumber.substring(6, 14);
      if (this.isDate8(date8) == false) {
        callback('身份证中日期信息不正确!')
        return false;
      }
      for (let i = 0; i < 17; i++) {
        lngProduct = lngProduct + varArray[i];
      }
      intCheckDigit = 12 - lngProduct % 11;
      switch (intCheckDigit) {
        case 10:
          intCheckDigit = 'X';
          break;
        case 11:
          intCheckDigit = 0;
          break;
        case 12:
          intCheckDigit = 1;
          break;
      }
      if (varArray[17].toUpperCase() != intCheckDigit) {
        callback('身份证效验位错误!...正确为： " + intCheckDigit + "."')
        return false;
      }
    }
    else { // length is 15
      // check date
      var date6 = idNumber.substr(6, 12);
      if (this.isDate6(date6) == false) {
        callback('身份证日期信息有误！')
        return false;
      }
    }
    // alert ("Correct.");
    return true;
  }

  isDate6(sDate) {
    if (!/^[0-9]{6}$/.test(sDate)) {
      return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    if (year < 1700 || year > 2500)
      return false
    if (month < 1 || month > 12)
      return false
    return true
  }
  isDate8(sDate) {
    if (!/^[0-9]{8}$/.test(sDate)) {
      return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    day = sDate.substring(6, 8);
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year < 1700 || year > 2500)
      return false
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
      iaMonthDays[1] = 29;
    if (month < 1 || month > 12)
      return false
    if (day < 1 || day > iaMonthDays[month - 1])
      return false
    return true
  }
  isPhone = (rule, value, callback) => {
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    if (!mobile.test(value)) {
      callback('手机号码格式错误！')
    }
  }

  //员工信息搜索
  search = (value) => {
    var teacherList
    teacherList = this.state.dataSource.filter(array => array.name.match(value));
    this.setState({ dataSource: teacherList })
  }

  //编辑员工信息
  edit = (record) => {
    console.log(record)
  }

  //删除员工信息
  delete = (record) => {
    console.log(record)
    var params = {
      empId: record.key,
    }
    api.deleteEmp(params).then(res =>{
      //console.log(res);
     if(res.code == 0){
      message.success('删除成功！');
     }else{
       message.error('');
     }
   })

  }



  render() {
    const { dataSource } = this.state
    const Search = Input.Search;
    const Option = Select.Option;
    const columns = [
      {
        title: '姓名',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      }, {
        title: '身份证号',
        dataIndex: 'card',
        key: 'card',
      }, {
        title: '职位',
        dataIndex: 'jobName',
        key: 'jobName',
      }, {
        title: '所属部门',
        dataIndex: 'dept',
        key: 'dept',
      }, {
        title: '手机号码',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:void(0)"onClick={() => this.edit(record)}>Edit</a>
            <Divider type="vertical" />
            <Popconfirm title="确认删除该员工?" onConfirm={() => this.delete(record)} okText="确认" cancelText="取消">
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        ),
      }];
    const { getFieldDecorator } = this.props.form;



    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <Button type="primary" icon="plus-circle" style={{ float: 'left', marginLeft: 10, marginTop: 5 }} onClick={() => this.setState({ visible: true })}>新增员工</Button>

          <Search
            placeholder="员工姓名"
            enterButton="搜索"
            size="large"
            onSearch={this.search}
            style={{ float: 'left', width: 500, marginLeft: 200 }}
          />
        </div>
        <Table columns={columns} dataSource={dataSource} scroll={{ x: 1300 }} style={{ clear: 'both' }} />

        <Modal
          title="信息录入"
          visible={this.state.visible}
          wrapClassName="vertical-center-modal"
          okText="保存"
          cancelText="取消"
          onCancel={() => this.setState({ visible: false })}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              label="姓名">
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入姓名!',
                }],
              })(
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
              })(
                <InputNumber />
              )}
            </Form.Item>
            <Form.Item
              label="性别"
            >
              <Select style={{ width: 120 }}>
                <Option value="man">男</Option>
                <Option value="women">女</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="身份证号"
            >
              {getFieldDecorator('card', {
                rules: [{
                  required: true, message: '请输入身份证号!',
                }, {
                  validator: this.isIdCardNo,
                }],
              })(
                <Input type="text" style={{ width: 120 }} />
              )}
            </Form.Item>
            <Form.Item
              label="部门"
            >
              {getFieldDecorator('dept', {
                rules: [{
                  required: true, message: '请选择部门!',
                }],
              })(
                <Select style={{ width: 120 }}>
                  <Option value="zhaopin">人事招聘部</Option>
                  <Option value="rencai">人才服务部</Option>
                  <Option value="kaoqin">考勤考核部</Option>
                  <Option value="huanjing">环境架构部</Option>
                  <Option value="qukuailian">区块链研究部</Option>
                  <Option value="ai">人工智能研发部</Option>
                  <Option value="wangluo">网络应用部</Option>
                  <Option value="mobile">移动应用部</Option>
                  <Option value="xitong">系统架构部</Option>
                  <Option value="jinrong">金融事业部</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="职位"
            >
              {getFieldDecorator('job', {
                rules: [{
                  required: true, message: '请填写职位!',
                }],
              })(
                <Input type="text" style={{ width: 120 }} />
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
              })(
                <Input type="email" style={{ width: 120 }} />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

const Emp = Form.create({ name: 'normal_emp' })(Empp);
export default withRouter(Emp);