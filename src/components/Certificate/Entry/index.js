import React,{Component} from 'react';
import { Form, Button, Input, message, Cascader  } from 'antd';
import {withRouter} from "react-router-dom";
import api from './../../../api/api';


const Search = Input.Search;

class EntryCrs extends Component {
    constructor(props) {
        super(props);
        this.state={
          dataSource:{},//个人信息
        }
      }
     



 render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const optionA = [{
        value: 'guanlitixirenzheng',
        label: '管理体系认证',
        children: [{
          value: 'hangzhou',
          label: '质量管理体系认证',
          children: [{
            value: 'xihu',
            label: '质量管理体系认证（ISO9000）',
          },{
            value: 'xihu',
            label: '建设施工行业质量管理体系认证',
          },{
            value: 'xihu',
            label: '汽车行业质量管理体系认证',
          },{
            value: 'xihu',
            label: '航空业质量管理体系认证',
          },{
            value: 'xihu',
            label: '航空器维修质量管理体系',
          },{
            value: 'xihu',
            label: '国际铁路行业质量管理体系认证',
          }],
        }],
      },]
      
    return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label="证书名称"
          >
            {getFieldDecorator('email', {
              rules: [ {
                required: true, message: '请输入证书名称!',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label="认证项目"
          >
              <Cascader options={optionA}  placeholder="Please select" />       
          </Form.Item>
        </Form>
      );
 }
}

const Entry = Form.create({ name: 'register' })(EntryCrs);
export default withRouter(Entry);