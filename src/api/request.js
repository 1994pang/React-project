/*
* 封装axios代码
*
* */

import axios from 'axios';
import {message} from 'antd'
//引入store方法，store身上有一个getState方法
import store from '@redux/store'

// 创建axios的实例
 const  instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 50000,
});
//设置请求拦截器，发送请求之前触发函数
instance.interceptors.request.use(
    (config) => {
        //加上公共的请求头参数
        //    api/login 不需要加请求头
        //    config就是发送请求的配置信息（请求      头，参数，方法）
        const {token}=store.getState().user;
        if(token){
            config.headers.authentication=token;
        }
return config;
    });
//// 设置响应拦截器：处理响应之前(.then/.catch之前触发)触发函数
instance.interceptors.response.use(
    // 请求成功
    // result就是响应体数据
    (response)=>{
        const result=response.data;
        if(result.status===0){
            return result.data;
        }else {
            // 功能失败 --> 后面触发catch
            // 错误提示
            message.error(result.msg);
            return Promise.reject(result.msg)
        }
    },
    // 请求失败 --> 响应状态码 400 500
    (error)=>{
        console.log('axios请求失败：', error)
       message.error('未知错误，请联系管理员~') ;

    return Promise.reject('未知错误，请联系管理员~');}
)
export default instance;