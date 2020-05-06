import service from '../ulits/request.js'

//获取省市区
export function getArea(data){
	return service.request({
					method:'post',
					url:'	/cityPicker/',
					data
				})
}