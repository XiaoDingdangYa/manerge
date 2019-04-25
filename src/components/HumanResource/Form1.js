import {Form, Input, Modal, Select, Cascader, Button} from 'antd';
import React, { Component } from 'react';
import './Form1.css'
import city from './city.json'


class Form11 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }


      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

      check = () => {
        this.props.form.validateFields(
          (err) => {
            if (!err) {
              console.info('success');
            }
          },
        );
      }
      

      displayRender = (label) => {
        return label[label.length - 1];
      }

    render(){
        const { getFieldDecorator } = this.props.form;
       

          const options = [{
            value: '高级管理',
            label: '高级管理',
            children: [{
              value: '高级管理职位',
              label: '高级管理职位',
              children: [{
                value: 'CEO/总裁/总经理',
                label: 'CEO/总裁/总经理',
              },{
                value: '副总裁/副总经理',
                label: '副总裁/副总经理',
              },{
                value: '事业部负责人',
                label: '事业部负责人',
              },{
                value: '区域/分公司负责人',
                label: '区域/分公司负责人',
              },{
                value: '总裁/总经理/董事长助理',
                label: '总裁/总经理/董事长助理',
              },{
                value: '合伙人',
                label: '合伙人',
              },{
                value: '创始人',
                label: '创始人',
              },{
                value: '董事会秘书',
                label: '董事会秘书',
              }],
            }],
          }, {
            value: '技术',
            label: '技术',
            children: [{
              value: '后端开发',
              label: '后端开发',
              children: [{
                value: 'Java',
                label: 'Java',
              },{
                value: 'C++',
                label: 'C++',
              },{
                value: 'PHP',
                label: 'PHP',
              },{
                value: '数据挖掘',
                label: '数据挖掘',
              },{
                value: 'C',
                label: 'C',
              },{
                value: 'C#',
                label: 'C#',
              },{
                value: '.NET',
                label: '.NET',
              },{
                value: 'Python',
                label: 'Python',
              },{
                value: 'Ruby',
                label: 'Ruby',
              },{
                value: '自然语言处理',
                label: '自然语言处理',
              }],
            },{
              value: '前端开发',
              label: '前端开发',
              children: [{
                value: 'web前端',
                label: 'web前端',
              },{
                value: 'JavaScript',
                label: 'JavaScript',
              },{
                value: 'Flash',
                label: 'Flash',
              },{
                value: 'HTML5',
                label: 'HTML5',
              }],
            },{
              value: '移动开发',
              label: '移动开发',
              children: [{
                value: 'HTML5',
                label: 'HTML5',
              },{
                value: 'Android',
                label: 'Android',
              },{
                value: 'IOS',
                label: 'IOS',
              },{
                value: 'WP',
                label: 'WP',
              },{
                value: '移动web前端',
                label: '移动web前端',
              },{
                value: 'U3D',
                label: 'U3D',
              },{
                value: 'COCOS2DX',
                label: 'COCOS2DX',
              }],
            },{
              value: '测试',
              label: '测试',
              children: [{
                value: '测试工程师',
                label: '测试工程师',
              },{
                value: '自动化测试',
                label: '自动化测试',
              },{
                value: '功能测试',
                label: '功能测试',
              },{
                value: '性能测试',
                label: '性能测试',
              },{
                value: '测试开发',
                label: '测试开发',
              },{
                value: '移动端测试',
                label: '移动端测试',
              },{
                value: '游戏测试',
                label: '游戏测试',
              },{
                value: '硬件测试',
                label: '硬件测试',
              },{
                value: '软件测试',
                label: '软件测试',
              }],
            },{
              value: '运维/技术支持',
              label: '运维/技术支持',
              children: [{
                value: '运维工程师',
                label: '运维工程师',
              },{
                value: '运维开发工程师',
                label: '运维开发工程师',
              },{
                value: '网络工程师',
                label: '网络工程师',
              },{
                value: '系统工程师',
                label: '系统工程师',
              },{
                value: 'IT技术支持',
                label: 'IT技术支持',
              },{
                value: '系统管理员',
                label: '系统管理员',
              },{
                value: '网络安全',
                label: '网络安全',
              },{
                value: '系统安全',
                label: '系统安全',
              },{
                value: 'DBA',
                label: 'DBA',
              }],
            }],
          }];

        return(
            <div style={{padding:20}}>
                
                <Form
                  ref={self => this.form = self}
                 onSubmit={this.handleSubmit} name="form1">
                 <Form.Item>
                 <h1 style={{fontSize:"1cm"}}>1.职位基本信息</h1>
                 </Form.Item>
                    <Form.Item
                    label="公司"
                    >
                    {getFieldDecorator('company', {
                        rules: [{
                        required: true, message: 'Please input your company!',
                        }],
                    })(
                        <Input style={{width:'40%'}} placeholder="请输入公司名称"/>
                    )}
                    </Form.Item>
                    <Form.Item
                    label="职位名称"
                    >
                    {getFieldDecorator('poname', {
                        rules: [{
                        required: true, message: 'Please input your company!',
                        }],
                    })(
                        <Input style={{width:'40%'}} placeholder="请输入职位名称"/>
                    )}
                    </Form.Item>
                    <Form.Item
                    label="职位类型"
                    >
                    {getFieldDecorator('potype', {
                        rules: [{
                        required: true, message: 'Please input your company!',
                        }],
                    })(
                      <Cascader options={options} displayRender={this.displayRender}  placeholder="请选择职位类型" style={{width:'40%'}} />
                    )}
                    </Form.Item>
                    <Form.Item
                    label="工作城市"
                    >
                    {getFieldDecorator('pocity', {
                        rules: [{
                        required: true, message: 'Please input your company!',
                        }],
                    })(
                      <Cascader fieldNames={{ label: 'name', value: 'name', children: 'city' }} options={city} displayRender={this.displayRender}  placeholder="请选择工作城市" style={{width:'40%'}} />
                    )}
                    </Form.Item>
                    <Form.Item
                    label="工作地点"
                    >
                    {getFieldDecorator('poplace', {
                        rules: [{
                        required: true, message: 'Please input your company!',
                        }],
                    })(
                        <Input style={{width:'40%'}} />
                    )}
                    </Form.Item>
                    <Form.Item>
                      <Button style={{display:'none'}}  onClick={this.check} className="btn"></Button>
                    </Form.Item>
                </Form>
                
            </div>
        )
    }
}

const Form1 = Form.create({ name: 'form1' })(Form11);

export default Form1;
