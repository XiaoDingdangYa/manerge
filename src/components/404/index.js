import img from './img/404.png'
import React, { Component } from 'react';


class routerEnter extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentWillMount(){
    sessionStorage.removeItem("openke");
        sessionStorage.removeItem("selectedke");
  }






  render() {
    return (
      <div style={{height:'100%',width:'100%',backgroundImage:'url('+img+')',backgroundRepeat:'no-repeat',backgroundPosition: 'center'}}>
      </div>
    )
  }
}

export default routerEnter;