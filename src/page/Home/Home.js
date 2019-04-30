import React, { Component } from 'react';
import { message,Modal,Layout} from 'antd';
import Headerbar from './Headerbar';
import Sidebar from './Sidebar';
import ContentMain from '../../components/ContentMain'
import Welcome from './Welcome'
import apis  from './../../api/api';
import {withRouter} from "react-router-dom";

const {Sider, Header, Content, Footer} = Layout

class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
     user:'',//用户信息
     usermenuList:[],//菜单列表数据
     loading:false,
     collapsed: false,
    }
  }


  componentWillMount(){
       var _user = sessionStorage.getItem("user");
       //console.log(_user)
       if( _user){
        this.setState({user:_user})
       }else{
         //console.log('未登录，将返回登录页面')
        this.props.history.push({pathname:'/Login'});
       }

       
    
   

  }

  componentDidMount(){
    var _user = sessionStorage.getItem("user");
    if( _user){
        this.getUserMenuList();
    }
  }

  toggle = () => {
     //console.log(this)  //状态提升后，到底是谁调用的它
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  // 获取用户菜单列表
  getUserMenuList(){
   
    var _this=this;
    _this.setState({loading:true});
    var _user = JSON.parse(sessionStorage.getItem("user"))
    //var userId = _user.userId
    var params={
    userId:_user.userId
    }
    apis.getUserMenuList(params).then(res => {
      // console.log(res);
      if(res.code == 0){
        let list=res.content;
        _this.setState({usermenuList:list,loading:false});
      }else if(res.code==400){
        _this.setState({loading:false});
        Modal.info({
          title: '登录失效，请重新登录！',
          okText:"确认",
          onOk() {
             sessionStorage.removeItem("user");
             _this.props.history.push({pathname:'/Login'});
          }
        });
      }else{
        _this.setState({loading:false});
        message.error(res.message);
      }

    })
  }

  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
   }



  render() {
    var _user = sessionStorage.getItem("user"); 
    var url = this.props.location.pathname  
    return (
      <div id='page'>
          <Layout>
            <Sider
                 collapsible
                 trigger={null}
                 collapsed={this.state.collapsed}>
              <Sidebar data={this.state.usermenuList} loading={this.state.loading} />
            </Sider>
            <Layout>
              <Header style={{background: '#fff', padding: '0 16px'}}>
              <Headerbar collapsed={this.state.collapsed} onToggle={this.toggle} userName={_user}/>
              </Header>
              <Content>
              {url=='/'||url=='/Home'?<Welcome/>:<ContentMain/>}
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2019
              </Footer>
            </Layout>
          </Layout>
        </div>
    );
  }
}

export default withRouter(Home);
