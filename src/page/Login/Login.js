import React from 'react';
import {Form, Icon, Input, Button, Checkbox,message} from 'antd';
import './login.css'
import api from './../../api/api';
import md5 from "js-md5";


class LoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("user_router");
    this.props.form.validateFields((err, values) => {
      e.preventDefault();
      if (!err) {
        //console.log('Received values of form: ', values);
        var params = {
          userName: values.userName,
          password: md5(values.password),
        };  
        api.login(params).then(res =>{
           //console.log(res);
          if(res.code == 0){
            sessionStorage.setItem("user",JSON.stringify(res.content));  //JOSN字符串
            //console.log('对了对了')
            this.props.history.push({pathname:'/Home'})
          }else{
            message.error('用户名或密码错误');
          }
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="LoginBg" >
        <div className="container">
          <div className="box">
              <h3 className='title'>用户登录</h3>
              <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item>
                    <Input type="hidden" value="" />
                  </Form.Item>
                  <Form.Item>
                  {getFieldDecorator('userName', {
                      rules: [{ required: true, message: '请输入您的用户名!' }],
                  })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
                  </Form.Item>
                  <Form.Item>
                  {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入您的密码!' }],
                  })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                  </Form.Item>
                  <Form.Item>
                  <Button type="primary" ghost htmlType="submit" className="login-form-button">
                     登录
                  </Button>
                  </Form.Item>
              </Form>
          </div>
        </div>
      </div>
    );
  }
}


const Login = Form.create({ name: 'normal_login' })(LoginForm);
export default Login;
