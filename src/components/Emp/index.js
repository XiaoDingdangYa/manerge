import { Button, Divider, Form, Input, InputNumber, message, Modal, Popconfirm, Select, Table, Tag, Radio } from 'antd';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import api from './../../api/api';




class Empp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],//个人信息
      visible: false,
      formSource:[],//当前修改员工信息
      deptSource:[],//部门信息
      jobSource:[],//职位信息
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

  componentDidMount() {
    var _user = sessionStorage.getItem("user");
    //console.log(_user)
    if (_user) {
      this.getEmpInfo();
      this.getDeptInfo();
    }
  }

  //获取所有员工信息
  getEmpInfo() {
    api.getEmpInfo().then(res => {
      console.log(res);
      if (res.code == 0) {
        let list = res.content;
        //console.log(list)
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
          let _status = list[i].status
          if(_status == 0){
            _status = '在职'
          } else{
            _status = '离职'
          }
          _empList.push({ 'key': _key, 'name': _name, 'age': _age, 'sex': _sex, 'card': _card, 'jobName': _jobName, 'dept': _dept, 'phone': _phone, 'email': _email, 'status':_status })
        }
        this.setState({ dataSource: _empList })
      } else {
        message.error(res.message);
      }

    })
  }

  //获取部门信息
  getDeptInfo(){
    api.getDeptInfo().then(res => {
        console.log(res);
       if(res.code == 0){
         let list=res.content;
         //console.log(list)
         var _deptList=[];
         for(let i=0;i<list.length;i++){
           let _key = list[i].deptId
           let _name = list[i].deptName
           let _jobName = list[i].jobName
           _deptList.push({'key':_key,'name':_name,'jobName':_jobName})
         }
         this.setState({deptSource:_deptList})
       }else{
         message.error(res.message);
       }
 
     })
}

choiceDept = (value) => {
  for (let i = 0; i < this.state.deptSource.length; i++) {
    if (value == this.state.deptSource[i].name) {
      console.log(value)
      this.setState({jobSource:this.state.deptSource[i].jobName})
    }
    
  }
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
    }else{
      callback()
    }
    // check and set value
    for (let i = 0; i < intStrLen; i++) {
      varArray[i] = idNumber.charAt(i);
      if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
        callback('错误的身份证号!')
      } else if (i < 17) {
        varArray[i] = varArray[i] * factorArr[i];
      }else{
        callback()
      }
    }
    if (intStrLen == 18) {
      // check date
      var date8 = idNumber.substring(6, 14);
      if (this.isDate8(date8) == false) {
        callback('身份证中日期信息不正确!')
        return false;
      }else{
        callback()
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
      }else{
        callback()
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
    }else{
      callback()
    }
  }

  //员工信息搜索
  search = (value) => {
    var teacherList
    if (value) {
      teacherList = this.state.dataSource.filter(array => array.name.match(value));
      this.setState({ dataSource: teacherList })
    }else{
      this.getEmpInfo()
    }
    
  }

  //编辑员工信息
  edit = (record) => {
    //console.log(record)
    this.setState({
      formSource:record,
      visible: true
    })
    
  }

  //删除员工信息
  delete = (record) => {
    console.log(record)
    var params = {
      empId: record.key,
    }
    if(record.status=='离职'){
      api.deleteEmp(params).then(res =>{
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
  }else{
    message.error('该员工属于在职状态，无法删除其资料！');
  }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      //console.log(values)
        var params = {
          empId:values.key,
          empName:values.name,
          sex:values.sex,
          age:values.age,
          card:values.card,
          phone:values.phone,
          email:values.email,
          deptName:values.dept,
          jobName:values.jobName,
        };  
        console.log(params)
        api.addEmp(params).then(res =>{
           console.log(res);
          if(res.code == 0){
            message.success('修改成功！')
            setTimeout(() => {
              window.location.reload(true);
            }, 1500);
          }else{
            message.error(res.err);
          }
        })
      
    });
  }



  render() {
    const { dataSource,formSource,visible } = this.state
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
        title: '在职状态',
        dataIndex: 'status',
        key: 'status',
        render:(tag) => (
          tag=='在职'?
          <span>          
            <Tag color="green" key={tag}>{tag}</Tag>
          </span>
          :<span>          
          <Tag color="gray" key={tag}>{tag}</Tag>
          </span>
        )
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

    var opdept = [];
    var opjob = [];
    if(this.state.deptSource){
      //console.log(this.state.deptSource)
      opdept.push(this.state.deptSource.map((item)=>
      <Option value={item.name} key={item.key}>{item.name}</Option>
      )
      )
      
    }
    if(this.state.jobSource){
      //console.log(this.state.jobSource)
      opjob.push(this.state.jobSource.map((item)=>
      <Option value={item} key={item}>{item}</Option>
      )
      )
    }
    
    //console.log(formSource)


    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <Button type="primary" icon="plus-circle" style={{ float: 'left', marginLeft: 10, marginTop: 5 }} onClick={() => this.setState({ visible: true,formSource:[] })}>新增员工</Button>
          <Search
            placeholder="员工姓名"
            enterButton="搜索"
            size="large"
            onSearch={this.search}
            style={{ float: 'left', width: 500, marginLeft: 200 }}
          />
          
        </div>
        <Table columns={columns} dataSource={dataSource} scroll={{ x: 1300 }} style={{ clear: 'both' }} />

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
              label="部门"
            >
              {getFieldDecorator('dept', {
                rules: [{
                  required: true, message: '请选择部门!',
                }],
                initialValue: formSource.dept ||''
              })(
                <Select style={{ width: 160 }} onChange={this.choiceDept}>
                  {opdept}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="职位"
            >
              {getFieldDecorator('jobName', {
                rules: [{
                  required: true, message: '请填写职位!',
                }],
                initialValue: formSource.jobName ||''
              })(
                <Select style={{ width: 160 }}>
                  {opjob}
                </Select>
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

const Emp = Form.create({ name: 'normal_emp' })(Empp);
export default withRouter(Emp);