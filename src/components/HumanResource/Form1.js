import {message, Form, Input} from 'antd';
import React, { Component } from 'react';



class Form11 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }


    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{padding:20}}>
                <h1>1.职位基本信息</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                    label="公司"
                    >
                    {getFieldDecorator('company', {
                        rules: [{
                        required: true, message: 'Please input your company!',
                        }],
                    })(
                        <Input style={{width:600}} />
                    )}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const Form1 = Form.create({ name: 'form1' })(Form11);

export default Form1;
