import axios from "axios"
import qs from "qs"

var url=document.domain,_baseUrl;
    _baseUrl="http://127.0.0.1:8080"

export default{
    _baseUrl:_baseUrl, 

    //1.验证用户名密码
    login:params => {
        return axios.get(`${_baseUrl}/loginIn`,{params:params}).then(res=>res.data)
    },
    //2.修改用户密码
    updatePassword:params => {
        return axios.get(`${_baseUrl}/user/updatePassword`,{params:params}).then(res=>res.data)
    },

    //3.用户菜单列表
    getUserMenuList:params => {
        return axios.get(`${_baseUrl}/user/menu/list`,{params:params}).then(res=>res.data)
    },

    //4.获取用户信息
    getUserInfo:params =>{
        return axios.get(`${_baseUrl}/user/info`,{params:params}).then(res=>res.data)
    },

    //5.获取部门信息
    getDeptInfo:() => {
        return axios.get(`${_baseUrl}/dept/info`).then(res=>res.data)
    },

    //6.获取全部员工信息
    getEmpInfo:() => {
        return axios.get(`${_baseUrl}/user/allInfo`).then(res=>res.data)
    },

    //7.删除菜单
    deleteMenu:params => {
        return axios.post(`${_baseUrl}/api/menu/delete`,qs.stringify(params)).then(res=>res.data)
    },

    //8.获取菜单列表
    getMenuList:params => {
        return axios.get(`${_baseUrl}/api/menu/list`,{params:params}).then(res=>res.data)
    },

    //9.角色列表
    getRoleList:params => {
        return axios.get(`${_baseUrl}/api/role/list`,{params:params}).then(res=>res.data)
    },
    
    //10.添加角色
    createRole:params => {
        return axios.post(`${_baseUrl}/api/role/create`,qs.stringify(params)).then(res=>res.data)
    },

     //11.更新角色
     updateRole:params => {
        return axios.post(`${_baseUrl}/api/role/update`,qs.stringify(params)).then(res=>res.data)
    },

    //12.删除角色
    deleteRole:params => {
        return axios.post(`${_baseUrl}/api/role/delete`,qs.stringify(params)).then(res=>res.data)
    },

    //13.角色权限列表
    getPrivilegeList:params => {
        return axios.get(`${_baseUrl}/api/role/privilege/list`,{params:params}).then(res=>res.data)
    },

    //14.角色用户列表
    getUserRoleList:params => {
        return axios.get(`${_baseUrl}/api/role/user/list`,{params:params}).then(res=>res.data)
    },

    //15.添加角色用户关联
    createUserRole:params => {
        return axios.post(`${_baseUrl}/api/role/user/create`,qs.stringify(params)).then(res=>res.data)
    },

    //16.删除角色用户关联
    deleteUserRole:params => {
        return axios.post(`${_baseUrl}/api/role/user/delete`,qs.stringify(params)).then(res=>res.data)
    },

    //17.更新角色权限关联
    updateUserRole:params => {
        return axios.post(`${_baseUrl}/api/role/privilege/update`,qs.stringify(params)).then(res=>res.data)
    },

    //18.上传图片
    upload:params => {
        return axios.post(`${_baseUrl}/api/upload/image`,qs.stringify(params)).then(res=>res.data)
    },

    //18.退出登录
    logout:params => {
        return axios.post(`${_baseUrl}/api/user/logout`,qs.stringify(params)).then(res=>res.data)
    },
}