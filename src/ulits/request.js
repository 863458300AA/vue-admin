import axios from 'axios'
import { Message } from 'element-ui'
import {getToken,getUsername} from '@/ulits/cookieSetting.js'
//创建axios,赋值给service

//判断师生环境还是开发环境
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api';

const service = axios.create({
	baseURL:BASEURL, //进行了这些操作之后 http://localhost:8080/api => http://www.web-jshtml.cn/productApi
	timeout:10000
})

//添加请求拦截器
/*
请求接口前要做什么,根据业务需求
后台需要前端这边传相关的参数(在请求头添加参数)
例如 token值
		 userId
		  
*/
service.interceptors.request.use(config=>{
	config.headers['Tokey'] = getToken();
	config.headers['UserName'] = getUsername();
	return config
},function(err){
	return Promise.reject(err)
})

//添加响应拦截器
service.interceptors.response.use((res)=>{
	//对响应数据做处理
	let data = res.data;
	if(data.resCode){
		Message.error({
			message: data.message,
			duration:1500
		})
		return Promise.reject(data)
	}else{
		if(data.message !== 'OK') Message.success(data.message);
		return res;
	}
})

export default service