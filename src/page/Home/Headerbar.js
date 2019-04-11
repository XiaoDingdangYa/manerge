import React, { Component } from 'react';
import './header.css';
import screenfull from 'screenfull'
import { Menu,Dropdown, Icon,Input,Badge,Modal,Form,message} from 'antd';
import api from '../../api/api';
import {withRouter} from "react-router-dom";
import md5 from "js-md5";

const confirm = Modal.confirm;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      user_image:'',//用户头像
      icon: 'arrows-alt',
      count: 100,
      visible: false,
      adVisible: false,
      avatar: require('./02.jpg')
    }
  }

  componentDidMount(){
    screenfull.onchange(() => {
      this.setState({
        icon: screenfull.isFullscreen ? 'shrink' : 'arrows-alt'
      })
    })
  }

  componentWillUnmount () {
    screenfull.off('change')
  }

  //退出登录
  loginOut(){
     var _this = this;
    confirm({
      title: '确认退出吗?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        console.log(_this.props)
        _this.props.history.push({pathname:'/login'})
        sessionStorage.removeItem("user");
      },
    });
  }

  toggle = () => {
    this.props.onToggle()
  }

  screenfullToggle = () => {
    if (screenfull.enabled) {
      screenfull.toggle()
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  //修改密码
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        var params = {
          userName: values.userName,
          oldPassword: md5(values.oldPassword),
          password:md5(values.password)
        };  
        api.updatePassword(params).then(res =>{
          console.log(res);
         if(res.code == 0){
           console.log('修改成功')
           this.props.history.push({pathname:'/login'})
         }else{
           message.error(res.message);
         }
       })
      }
    });
  }

  //调用打卡者信息
  attendance = () =>{
  //   var params = {

  //   };  
  //   api.atten(params).then(res =>{
  //     console.log(res);
  //    if(res.code == 0){
  //      console.log('打卡成功')
  //    }else{
  //      message.error(res.message);
  //    }
  //  })
    console.log('点击了')
    this.setState({adVisible: true})
  }

  //打卡
  handleOk = () =>{
    //   var params = {

  //   };  
  //   api.atten(params).then(res =>{
  //     console.log(res);
  //    if(res.code == 0){
  //      console.log('打卡成功')
  //    }else{
  //      message.error(res.message);
  //    }
  //  })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {icon, avatar} = this.state;
    const {collapsed} = this.props
    var _user = this.props.userName;
    if( _user){
      _user = JSON.parse( _user).userName;
      //console.log(_user)
    }
    const menu = (
      <Menu className='menu'>
        <Menu.ItemGroup title='用户中心' className='menu-group'>
          <Menu.Item>你好 - {_user}</Menu.Item>
          <Menu.Item><span onClick={() => this.setState({visible: true})}>修改密码</span></Menu.Item>
          <Menu.Item><span onClick={this.loginOut.bind(this)}>退出登录</span></Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    )
    const login = (
      <Dropdown overlay={menu}>
        <img src={avatar} alt=""/>
      </Dropdown>
    )

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    
    return (
      <div id='headerbar'>
      <Icon
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        className='trigger'
        onClick={this.toggle}/>
      <div style={{lineHeight: '64px', float: 'right'}}>
        <ul className='header-ul'>
          <li id="attend"> <a onClick={this.attendance}>今日打卡<i style={{fontSize:18}}><Icon type="environment" /></i> </a></li>
          <li><Icon type={icon} onClick={this.screenfullToggle}/></li>
          <li onClick={() => this.setState({count: 0})}>
            <Badge count={this.state.count} overflowCount={99} style={{marginRight: -17}}>
              <Icon type="notification"/>
            </Badge>
          </li>
          <li>
            {login}
          </li>
        </ul>
      </div>
      <Modal
        title="修改密码"
        visible={this.state.visible}
        wrapClassName="vertical-center-modal"
        okText="确认"
        cancelText="取消"
        onCancel={() => this.setState({visible: false})}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input type="hidden" value={_user} />
          </Form.Item>
          <Form.Item
            label="原密码"
          >
            {getFieldDecorator('oldPassword', {
              rules: [{
                required: true, message: '请输入您的原密码!',
              }],
            })(
              <Input type="password" />
            )}
          </Form.Item>
          <Form.Item
            label="新密码"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入您的新密码!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />
            )}
          </Form.Item>
          <Form.Item
            label="确认密码"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请确认您的新密码!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" />
            )}
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="今日打卡"
        visible={this.state.adVisible}
        wrapClassName="vertical-center-modal"
        okText="打卡"
        cancelText="取消"
        onCancel={() => this.setState({adVisible: false})}
        onOk={this.handleOk}>
        <ul>
          <li><span>工号：</span></li>
          <li><span>姓名：</span></li>
          <li><span>当前时间：</span></li>
        </ul>
      </Modal>

    </div>
    );
  }
}

const Headerbar = Form.create({ name: 'normal_herder' })(Header);
export default withRouter(Headerbar);
