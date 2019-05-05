import React, { Component } from 'react';
import { Button } from 'antd';
import {withRouter,Link} from "react-router-dom";



class BPM extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userId:JSON.parse(sessionStorage.getItem("user")).userId
    }
  }







  render() {
      const {userId} = this.state
    return (
      <Button size='large' style={{margin:10}}>
          <Link to={{pathname:"/BPM/Initiate/Leave", search: '?user='+userId }}>离职申请</Link>
      </Button>
    )
  }
}

export default BPM;