import service from '../ulits/request.js'

/* 
	信息列表 
*/


//获取信息列表
export function InfoList(data){
	return service.request({
					method:'post',
					url:'/news/getList/',
					data
				})
}
//添加信息
export function addInfo(data){
	return service.request({
					method:'post',
					url:'/news/add/',
					data
				})
}
//修改信息
export function editInfo(data){
	return service.request({
					method:'post',
					url:'	/news/editInfo/',
					data
				})
}
//删除信息
export function deleteInfo(data){
	return service.request({
					method:'post',
					url:'	/news/deleteInfo/',
					data
				})
}

/* 
	信息分类 
*/

//获取信息分类
export function infoCategory(){
	return	service.request({
					  method:'post',
					  url:'	/news/getCategoryAll/'
					})
}

//信息分类添加一级
export function addFirstCategory(data){
	return service.request({
					method:'post',
					url:'/news/addFirstCategory/',
					data
				})
}
//信息分类添加子级
export function addChildrenCategory(data){
	return	service.request({
						method:'post',
						url:'/news/addChildrenCategory/',
						data
					})
}
//删除分类
export function deleteCategory(data){
	return service.request({
					method:'post',
					url:'/news/deleteCategory/',
					data
				})
}
//修改分类
export function editCategory(data){
	return service.request({
					method:'post',
					url:'/news/editCategory/',
					data
				})
}
