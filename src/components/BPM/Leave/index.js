import React, { Component } from 'react';
import { Button, Form } from 'antd';


class Leave extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }







  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
      <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default Leave;