import {message, Form, Input, Radio} from 'antd';
import React, { Component } from 'react';



class Form22 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }

      handleSubmit = () => {

      }

      handleFormLayoutChange = (e) => {
        this.setState({ formLayout: e.target.value });
      }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{padding:20}}>
                <h1>2.职位要求</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                    label="工作性质"
                    >
                        <Radio.Group defaultValue="全职" onChange={this.handleFormLayoutChange}>
                            <Radio.Button value="全职">全职</Radio.Button>
                            <Radio.Button value="兼职">兼职</Radio.Button>
                            <Radio.Button value="实习">实习</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const Form2 = Form.create({ name: 'form2' })(Form22);

export default Form2;
