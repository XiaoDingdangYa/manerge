import {message,Steps, Button} from 'antd';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import api from './../../../api/api';
import './index.css'
import Form1 from './../Form1';
import Form2 from './../Form2';

const Step = Steps.Step;

const steps = [{
    title: 'First',
    content: <Form1/>,
  }, {
    title: 'Last',
    content: <Form2/>,
  }];

class InfoPublish extends Component {
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
        };
      }

      next() {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    
      prev() {
        const current = this.state.current - 1;
        this.setState({ current });
      }
    render(){
        const { current } = this.state;
        return(
            <div style={{padding:20}}>
                <Steps current={current} style={{width:500,margin:(0,'auto')}}>
                {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action" style={{float:'right'}}>
                {
                    current < steps.length - 1
                    && <Button type="primary" onClick={() => this.next()}>下一步</Button>
                }
                {
                    current === steps.length - 1
                    && <Button type="primary" onClick={() => message.success('Processing complete!')}>发布</Button>
                }
                {
                    current > 0
                    && (
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    上一步
                    </Button>
                    )
                }
                </div>
            </div>
        )
    }
}

export default InfoPublish;
