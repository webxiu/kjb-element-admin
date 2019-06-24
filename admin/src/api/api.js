import axios from 'axios';
import * as url from './urlConfig'

//登录
export const requestLogin = params => { return axios.post(url.login, params).then(res => res.data); };
//获取
export const requestOrder = param => { return axios.get(url.order, {params:param}).then(res => res.data); };
//编辑
export const requestEdit = params => { return axios.post(url.editFrom,params).then(res => res.data); };
//删除
export const requestDelete = params => { return axios.post(url.deleteOrder,params).then(res => res.data); };
//添加
export const requestAdd = params => { return axios.post(url.addOrder,params).then(res => res.data); };
//点赞
export const requestPraise = param => { return axios.get(url.praise,{params:param}).then(res => res.data); };
//我的点赞
export const requestZan = param => { return axios.get(url.zan,{params:param}).then(res => res.data); };
//签到
export const requestSignin = param => { return axios.get(url.signin,{params:param}).then(res => res.data); };