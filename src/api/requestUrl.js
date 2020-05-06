import service from '../ulits/request.js'

/* 获取表格 */
export function getTableData(data){
	return	service.request(data)
}
/* 增加用户 */
export function addUser(data){
	return service.request({
					method:'post',
					url:'/user/add/',
					data
				})
}

/* 删除用户 */
export function delUser(data){
	return service.request({
					method:'post',
					url:'/user/delete/',
					data
				})
}

/* 用户禁启用 */
export function userStatus(data){
	return service.request({
					method:'post',
					url:'/user/actives/',
					data
				})
}

/* 用户编辑 */

export function editUser(data){
	return service.request({
					method:'post',
					url:'/user/edit/',
					data
				})
}

/* 获取角色 */
export function getRole(){
	return service.request({
					method:'post',
					url:'/userRole/'
				})
}

/* 获取系统 */
export function getSystem(){
	return service.request({
					method:'post',
					url:'/system/'
				})
}

/* 获取按钮 */
export function getBtnPre(){
	return service.request({
					method:'post',
					url:'/permButton/'
				})
}
