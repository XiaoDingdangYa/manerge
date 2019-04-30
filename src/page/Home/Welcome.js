import React, { Component } from 'react';
import {withRouter} from "react-router-dom";



class Welcome extends Component {
  render() {
    return (
      <div >
          <p style={{position:'absolute',top:'40%',left:'30%',fontSize:'5rem'}}>欢迎使用人事管理系统</p>
     </div>
    );
  }
}

export default withRouter(Welcome);
