/*
*包含了n个功能的工厂函数模块
*
* */
import {SAVE_USER} from './action-types';
export  const saveUser=(user)=>({type:SAVE_USER,data:user})