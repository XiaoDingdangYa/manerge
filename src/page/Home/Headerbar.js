import React, { Component } from 'react';
import './header.css';
import screenfull from 'screenfull'
import { Menu,Dropdown, Icon,Input,Badge,Modal,Form,message, Button} from 'antd';
import api from '../../api/api';
import {withRouter} from "react-router-dom";
import md5 from "js-md5";

const confirm = Modal.confirm;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      user:'',
      userId:'',
      user_image:'',//用户头像
      icon: 'arrows-alt',
      count: 100,
      visible: false,
      adVisible: false,
      avatar: require('./02.jpg'),
      date:new Date(),//当前时间
      endate:new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),//当天23：59：59
      downdate:new Date(new Date(new Date().toLocaleDateString()).getTime()+18*60*59*989-1).toLocaleTimeString('en-US', { hour12: false }),
      up_disabled:false,//签到按钮disabled
      down_disabled:false,//签退按钮disabled
    }
  }

  componentDidMount(){
    var _user = this.props.userName;
    var _userId;
    var _userName;
    if(_user){
      _userName = JSON.parse( _user).userName;
      _userId = JSON.parse( _user).userId;
    this.setState({user:_userName,userId:_userId})
    }
    screenfull.onchange(() => {
      this.setState({
        icon: screenfull.isFullscreen ? 'shrink' : 'arrows-alt'
      })
    })

    this.interval = setInterval(() => this.tick(), 1000); 

    var se = this.state.date
    if(this.state.date==this.state.endate){
      this.setState({up_disabled:false,down_date:false})
    }
    
  }

  componentWillUnmount () {
    screenfull.off('change')
    clearInterval(this.interval);
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
        sessionStorage.removeItem("url");
        sessionStorage.removeItem("openke");
        sessionStorage.removeItem("selectedke");
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
        console.log(this.state.user)
        var params = {
          userName: this.state.user,
          oldPassword: md5(values.oldPassword),
          password:md5(values.password)
        };  
        api.updatePassword(params).then(res =>{
          console.log(res);
         if(res.code == 0){
           message.success('修改成功!')
           setTimeout(() => {
            this.props.history.push({pathname:'/login'})
          }, 1500);   
         }else{
           message.error(res.message);
         }
       })
      }
    });
  }

  tick = () =>{
    this.setState({date:new Date()})
  }

  //调用打卡者信息
  attendance = () =>{
    this.setState({adVisible: true})
    var params ={
      userId:this.state.userId
    }
    api.attendExist(params).then(res =>{
      console.log(res.content)
      if (res.code == 0) {
        if(res.content.upStatus == '1'){
          this.setState({up_disabled:false})
        }else{
          this.setState({up_disabled:true})
        }
        if(res.content.downStatus == '1'){
          this.setState({down_disabled:false})
        }else{
          this.setState({down_disabled:true})
        }
      }
    })
  }

  //签到
  handleUp = () =>{
       var params = {
        userId:this.state.userId
     };  
    api.attendUp(params).then(res =>{
      //console.log(res);
     if(res.code == 0){
      this.setState({up_disabled:true})
      message.success('签到成功！')
     }else{
       message.error(res.message);
     }
   })
  }

  //签退
  handleDown = () =>{
    if(this.state.up_disabled == true){
      console.log('签退')
      var params = {
        userId:this.state.userId
     };  
     console.log(this.state.downdate)

     if (this.state.date.toLocaleTimeString('en-US', { hour12: false }) < this.state.downdate) {
      Modal.confirm({
        content:'还未到下班时间，确认签退？',
        onOk:this.down
      })
     }else{
        api.attendDown(params).then(res =>{
          console.log(res);
         if(res.code == 0){
          this.setState({down_disabled:true})
          message.success('签退成功！');           
         }else{
           message.error(res.message);
         }
       })
     }
      
    }else{
     message.warning('请先签到！')
    }
  }

  down = () => {
    var params = {
      userId:this.state.userId
   };
    api.attendDown(params).then(res =>{
          console.log(res);
         if(res.code == 0){
          this.setState({down_disabled:true})
          message.success('签退成功！');           
         }else{
           message.error(res.message);
         }
       })  
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {icon, avatar,up_disabled,down_disabled,up_date,down_date} = this.state;
    const {collapsed} = this.props;
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


    
    return (
      <div id='headerbar'>
      <Icon
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        className='trigger'
        onClick={this.toggle}/>
      <div style={{lineHeight: '64px', float: 'right'}}>
        <ul className='header-ul'>
          <li id="attend"> <a onClick={this.attendance}>今日打卡<i style={{fontSize:18}}><Icon type="environment" /></i> </a></li>
          <li><Icon type={icon} onClick={this.screenfullToggle} style={{cursor:'pointer'}}/></li>
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
        footer={null}
        onCancel={() => this.setState({visible: false})}>
        <Form  onSubmit={this.handleSubmit}>
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
          <Form.Item>
              <Button type="primary" htmlType="submit" style={{float:'right'}}>
                     保存
              </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="今日打卡"
        visible={this.state.adVisible}
        wrapClassName="vertical-center-modal"
        footer={null}
        onCancel={() => this.setState({adVisible: false})}>
        <ul>
          <li><span>姓名：{_user}</span></li>
          <li><span>当前时间：{this.state.date.toLocaleTimeString('en-US', { hour12: false })}</span></li>
          <span style={{float:'right'}}>
          <Button type='primary' style={{marginRight:10}} onClick={this.handleUp} disabled={this.state.up_disabled}>签到</Button>
          <Button onClick={this.handleDown} disabled={this.state.down_disabled}>签退</Button>
          </span>
        </ul>
      </Modal>

    </div>
    );
  }
}

const Headerbar = Form.create({ name: 'normal_herder' })(Header);
export default withRouter(Headerbar);
