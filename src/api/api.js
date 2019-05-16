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
        return axios.get(`${_baseUrl}/update`,{params:params}).then(res=>res.data)
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

    //7.删除员工
    deleteEmp:params => {
        return axios.post(`${_baseUrl}/user/del`,qs.stringify(params)).then(res=>res.data)
    },

    //8.删除部门
    deleteDept:params => {
        return axios.post(`${_baseUrl}/dept/del`,qs.stringify(params)).then(res=>res.data)
    },

    //9.上班打卡
    attendUp:params => {
        return axios.get(`${_baseUrl}/attend/up`,{params:params}).then(res=>res.data)
    },

    //10.下班打卡
    attendDown:params => {
        return axios.get(`${_baseUrl}/attend/down`,{params:params}).then(res=>res.data)
    },
    
    //11.权限角色
    getRole:params => {
        return axios.get(`${_baseUrl}/power/all`).then(res=>res.data)
    },

     //12.对应角色用户
     getRoleuser:params => {
        return axios.get(`${_baseUrl}/power/select`,{params:params}).then(res=>res.data)
    },

    //13.删除角色
    deleteRole:params => {
        return axios.get(`${_baseUrl}/power/del`,{params:params}).then(res=>res.data)
    },

    //14.未授权角色列表
    addUser:params => {
        return axios.get(`${_baseUrl}/power/user`,{params:params}).then(res=>res.data)
    },

    //15.新增权限角色
    addRole:params => {
        return axios.get(`${_baseUrl}/power/insert`,{params:params}).then(res=>res.data)
    },

    //16.修改部门信息
    addDept:params => {
        return axios.post(`${_baseUrl}/dept/insert`,qs.stringify(params)).then(res=>res.data)
    },

    //17.个人考勤信息
    getUserAttend:params => {
        return axios.get(`${_baseUrl}/attend/info`,{params:params}).then(res=>res.data)
    },

    //18.考勤统计信息
    getAllAttend:() => {
        return axios.get(`${_baseUrl}/attend/all`).then(res=>res.data)
    },

    //19.调用是否存在当日打卡信息
    attendExist:params => {
        return axios.get(`${_baseUrl}/attend/exist`,{params:params}).then(res=>res.data)
    },

    //20.修改、新增员工信息
    addEmp:params => {
        return axios.post(`${_baseUrl}/user/insert`,qs.stringify(params)).then(res=>res.data)
    },

    bpmStart:params => {
        return axios.get(`${_baseUrl}/bpm/start`,{params:params}).then(res=>res.data)
    },

    bpmSelect:params => {
        return axios.get(`${_baseUrl}/bpm/select`,{params:params}).then(res=>res.data)
    },

    bpmAgree:params => {
        return axios.get(`${_baseUrl}/bpm/complete`,{params:params}).then(res=>res.data)
    },

    bpmDisagree:params => {
        return axios.get(`${_baseUrl}/bpm/refuse`,{params:params}).then(res=>res.data)
    },

    selectBpmTask:params => {
        return axios.get(`${_baseUrl}/bpm/selectBpmTask`,{params:params}).then(res=>res.data)
    },
    
}