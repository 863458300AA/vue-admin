import {getRole,getSystem} from '../../api/requestUrl.js'
import {defaultRoutes,activeRoutes} from '@/router/index.js'
const	state = { 
	roles:[],
	allRouters:defaultRoutes,
	addRouters:[],
	buttonPremission:'',
}

const getters = {
	roles:state=>state.roles,
	buttonPremission:state=>state.buttonPremission,
	addRouters:state=>state.addRouters,
	allRouters:state=>state.allRouters,
}

const	mutations = {
	/* 设置角色 */
	SETROLES(state,value){
		state.roles = value;
	},
	/* 设置按钮权限 */
	SETBUTTONS(state,value){
		state.buttonPremission = value;
		console.log(state.buttonPremission)
	},
	/* 动态生成路由 */
	SETROUTER(state,router){
		state.addRouters = router;
		state.allRouters = state.allRouters.concat(router)
	},
	/* 清除角色 */
	CLEARROLES(state){
		state.roles = [];
	},
	/* 重置整个路由 */
	INITALLROUTERS(state){
		state.allRouters = defaultRoutes;
	},
}

const	actions = {
	axiosGetRole({commit},resquestData){
		return new Promise((resolve,reject)=>{
			getRole().then(res=>{
				let data = res.data.data
				commit('SETROLES',data.role)
				commit('SETBUTTONS',data.btnPerm)
				resolve(data)
			})
		})
	},
	/* 创建动态路由 */
	createRouter({commit},data){
		return new Promise((resolve,reject)=>{
			commit('INITALLROUTERS'); //重置路由
			let addRouters = [];
			//超管账号
			if(data.includes('admin')){
				addRouters = activeRoutes
			}else{//普通账号	
				addRouters = activeRoutes.filter((item,index)=>{
						if(index === activeRoutes.length-1) return;
						if(data.includes(item.meta.system)) return item;
				})
				console.log(addRouters)
				addRouters.push(activeRoutes[activeRoutes.length - 1])
			}
			//更新路由
			commit('SETROUTER',addRouters)
			resolve();
		})
	}
}

export default {
	namespaced:true,
	state,
	mutations,
	actions,
	getters
};