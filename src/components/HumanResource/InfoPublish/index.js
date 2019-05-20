import {message, Button, Form, Input, Cascader, Radio, Select} from 'antd';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import api from './../../../api/api';
import city from './../city.json'

const Option = Select.Option;


class Form1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          statu:false,
          maxmoney:[]
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

      money = (value) =>{
        console.log(value)
        if(value){
          var mm = parseInt(value.substr(0,1))
          //console.log(mm)
          this.setState({statu:true,maxmoney:[mm+1+'K',mm+2+'K',mm+3+'K',mm+4+'K',mm+5+'K']})
        }
      }


    render(){
      const { getFieldDecorator } = this.props.form;
      const { TextArea } = Input;
       

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
          var money = [];
          console.log(this.state.maxmoney[0])
          if(this.state.maxmoney){
          money.push(this.state.maxmoney.map((item,index)=>
         <Option value={item} key={item}>{item}</Option>
         ))
        }

        return(
          <div style={{padding:20}}>       
          <Form onSubmit={this.handleSubmit}>
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
                <h1 style={{fontSize:"1cm"}}>2.职位要求</h1>
              </Form.Item>
              <Form.Item
              label="工作性质"
              >
                  <Radio.Group defaultValue="全职" onChange={this.handleFormLayoutChange}>
                      <Radio.Button value="全职" style={{marginRight:10}}>全职</Radio.Button>
                      <Radio.Button value="兼职" style={{marginRight:10}}>兼职</Radio.Button>
                      <Radio.Button value="实习">实习</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                label="工作经验"
                >
                {getFieldDecorator('poexperience', {
                  initialValue: '选择经验',
                  rules: [{
                  required: true, message: 'Please selcet your experience!',
                  }],
              })(
                <Select style={{ width: '15%' }}>
                <Option value="不限">不限</Option>
                <Option value="应届生">应届生</Option>
                <Option value="一年以内">一年以内</Option>
                <Option value="1-3年">1-3年</Option>
                <Option value="3-5年">3-5年</Option>
                <Option value="5-10年">5-10年</Option>
                <Option value="10年以上">10年以上</Option>
              </Select>
              )}
                </Form.Item>
                <Form.Item
                label="学历"
                >
                {getFieldDecorator('poeducation', {
                  initialValue: '选择学历',
                  rules: [{
                  required: true, message: 'Please selcet your education!',
                  }],
              })(
                <Select style={{ width: '15%' }}>
                <Option value="不限">不限</Option>
                <Option value="初中及以下">初中及以下</Option>
                <Option value="高中">高中</Option>
                <Option value="大专">大专</Option>
                <Option value="本科">本科</Option>
                <Option value="硕士">硕士</Option>
                <Option value="博士">博士</Option>
              </Select>
              )}
                </Form.Item>
                <Form.Item
                label="薪资范围"
                >
                <Select style={{ width: '15%', marginRight:10 }} placeholder='薪资范围' className='minmoney' onChange={this.money}>
                <Option value="1K">1K</Option>
                <Option value="2K">2K</Option>
                <Option value="3K">3K</Option>
                <Option value="4K">4K</Option>
                <Option value="5K">5K</Option>
                <Option value="6K">6K</Option>
                <Option value="7K">7K</Option>
                <Option value="8K">8K</Option>
                <Option value="9K">9K</Option>
                <Option value="10K">10K</Option>
                <Option value="11K">11K</Option>
                <Option value="12K">12K</Option>
                <Option value="13K">13K</Option>
                <Option value="14K">14K</Option>
                <Option value="15K">15K</Option>
                <Option value="16K">16K</Option>
                <Option value="17K">17K</Option>
                <Option value="18K">18K</Option>
                <Option value="19K">19K</Option>
                <Option value="20K">20K</Option>
                <Option value="25K">25K</Option>
                <Option value="30K">30K</Option>
                <Option value="35K">35K</Option>
                <Option value="40K">40K</Option>
                <Option value="45K">45K</Option>
                <Option value="50K">50K</Option>
                <Option value="60K">60K</Option>
                <Option value="70K">70K</Option>
                <Option value="80K">80K</Option>
                <Option value="90K">90K</Option>
                <Option value="100K">100K</Option>
              </Select>
              <span style={{marginRight:10, display:(this.state.statu==false)?'none':'inline-block' }}>至</span>
              <Select style={{ width: '15%', display:(this.state.statu==false)?'none':'inline-block' }} placeholder={this.state.maxmoney[0]} defaultValue={this.state.maxmoney[0]} className='maxmoney'>
                {money}
              </Select>

                </Form.Item>
                <Form.Item
                label="职位描述">
                {getFieldDecorator('podescibe', {
                  rules: [{
                  required: true, message: 'Please input your descibe!',
                  }],
                })(
                  <TextArea placeholder="请输入职位描述" rows={4} />
                )}
                </Form.Item>    
                <Form.Item>
                <Button type="primary" htmlType="submit">发布</Button>
                </Form.Item>
          </Form>
          
      </div>
        )
    }
}

const InfoPublish = Form.create({ name: 'form1' })(Form1);
export default InfoPublish;
