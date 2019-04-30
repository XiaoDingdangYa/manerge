import React, { Component } from 'react';
import './sidebar.css';
import {Menu,Icon,Spin} from 'antd';
import {Link,withRouter} from 'react-router-dom'

const SubMenu = Menu.SubMenu;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state={
      collapsed:false,//展开/关闭导航菜单标志
      selectedKeys:[],//当前选中的菜单项 key 数组
      openKeys:[],  //当前展开的 SubMenu 菜单项 key 数组
      usermenuList:[],
    }
  }

  componentWillMount(){
    let _parentCurrent=[this.props.openCurrent];
    this.setState({selectedKeys:this.props.current,openKeys:_parentCurrent});
  }

  componentDidMount() {
    // 防止页面刷新侧边栏又初始化了
    const pathname = this.props.location.pathname
    //获取当前所在的目录层级
    const rank = pathname.split('/')
    //console.log(rank)

    const openke = sessionStorage.getItem('openke')
    const selectedke = sessionStorage.getItem('selectedke')
    switch (rank.length) {
       case 2 :  //一级目录
         this.setState({
           selectedKeys: [selectedke],
          openKeys: [openke]
         })
         break;
      case 3 : 
        this.setState({
          selectedKeys: [selectedke],
          openKeys: [openke]
        })
        break;
    }
  }

  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }

  // 获取用户菜单列表
  getUserMenuList(){
     var list=this.props.data;
     console.log(list)
     var _usermenuList=[]; 
        for(let i=0;i<list.length;i++){
          let _userchildMenuList=list[i].childrenMenu
          let _name=list[i].menuName;
          let _redirect_url=list[i].menuURL;
          let _icon_url=list[i].menuICON;
          let _id=list[i].menuId;
          let _log=list[i].menuLog;
          let _changeIcon;
          if(this.props.openCurrent==_id){
             _changeIcon={id:_id,value:'true'};
          }else{
             _changeIcon={id:_id,value:'false'};
          }
          let _parent_id=list[i].parentId;         
          _usermenuList.push({'changeIcon':_changeIcon,'userchildMenuList':_userchildMenuList,'name':_name,'redirect_url':_redirect_url,'icon_url':_icon_url,'id':_id,'parent_id':_parent_id,'log':_log});
        } 
          return _usermenuList;
  }

  //展开/关闭导航菜单
  toggleCollapsed (){
    this.setState({
      collapsed: !this.state.collapsed,  
    });
  }

  //展开关闭SubMenu
  openChange(openKeys){
    //console.log(openKeys)
    var _this=this;
    var usermenuList=_this.getUserMenuList();
    const rootSubmenuKeys=usermenuList.map((item) =>{return item.id});
    //点击菜单，收起其他展开的所有菜单
    var latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    //不展开
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys },()=>{
        var data=usermenuList.map(item=>{
          if(item.changeIcon.value=='true'){
              item.changeIcon.value='false';
          }
          return item;
        })
        _this.setState({usermenuList:data});
      });

    } else {  //展开
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      },()=>{
        var data=usermenuList.map(item=>{
          if(item.changeIcon.id==_this.state.openKeys[0]){
            if(item.changeIcon.value=='false'){
              item.changeIcon.value='true';
            }
          }else{
            if(item.changeIcon.value=='true'){
              item.changeIcon.value='false';
            }
          }
          return item;
        })
        _this.setState({usermenuList:data});
      });
      
    }
    sessionStorage.setItem("openke",openKeys[1])
  }

  //点击 MenuItem 调用此函数
  handleClick(item){
    this.setState({
      selectedKeys: [item.key]
    })
    sessionStorage.setItem("selectedke",item.key)    
  }

  render() {
    var loading=this.props.loading;
    var usermenuList;
    var userUrl=[];
    const {openKeys, selectedKeys} = this.state
    if(this.state.usermenuList.length){
      usermenuList=this.state.usermenuList;
    }else{
      usermenuList=this.getUserMenuList();
    }
    var submenu=[];
    var userchildmenu=[];

    usermenuList.map((ite,i) =>{ 
      if(usermenuList[i].userchildMenuList){
        //console.log(usermenuList[i].userchildMenuList)
        userchildmenu.push(usermenuList[i].userchildMenuList.map((item,index) =>
        <Menu.Item key={item.menuId}>
        <Link to={item.menuURL}><span>{item.menuName}</span></Link>
       </Menu.Item>
        ));
        usermenuList[i].userchildMenuList.map((item,index) =>
        userUrl.push({'url':item.menuURL})
        );
        sessionStorage.setItem("url",JSON.stringify(userUrl)); 
      }else{
        userchildmenu.push();
      }
     });

    usermenuList.map((item,index) =>
       {
         (!item.userchildMenuList.length)?
        submenu.push():
            submenu.push(( <SubMenu style={{color:'#fff'}} key={item.id} title={<span><Icon type={item.icon_url} /><span>{item.name}</span></span>}>
             {userchildmenu[index]}
             </SubMenu>))
      }
    );
    //console.log(submenu)


    return (
      <div style={{height: '100vh'}}>
        <div>
        <h3 style={{textAlign:'center',fontSize:'20px',color:'#fff',paddingTop:'10px'}}>人事管理系统</h3>
            <Spin spinning={loading}>
            
            <Menu
              mode="inline"
              theme="dark"
              onClick={this.handleClick.bind(this)}
              selectedKeys={selectedKeys}
              onOpenChange={this.openChange.bind(this)}
              openKeys={openKeys}
            >
            {submenu}
            </Menu>
            </Spin>
        </div>
      </div>
    );
  }

  
}

export default withRouter(Sidebar);
