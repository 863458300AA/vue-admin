import service from '../ulits/request.js'

//获取验证码
export function getSms(data){
	console.log(data)
	return service.request({
					method:'post',
					url:'/getSms/',
					data
				})
}
//注册
export function Register(data){
	console.log(data)
	return service.request({
					method:'post',
					url:'	/register/',
					data
				})
}

//登录
export function Login(data){
	return service.request({
					method:'post',
					url:'	/login/',
					data
				})
}

//退出登录
export function LogOut(data){
	return service.request({
					method:'post',
					url:'	/logout/',
					data
				})
}

