import router from "./index.js"
import store from "../store/index.js"
import {getToken,removeToken,removeUserName} from "../ulits/cookieSetting.js"

console.log(getToken)
//路由守卫
router.beforeEach((to,from,next)=>{
	if(getToken()){
		//当用户返回登录页面
		if(to.path === '/login'){
			//清空cookie里的值
			removeToken();
			removeUserName()
			//清除vuex的值
			store.commit('app/SET_TOKEN','');
			store.commit('app/SET_USERNAME','');
			store.commit('getRole/CLEARROLES');
			next()
		}else{
			//获取用户的角色
			//动态分配路由权限
			// 1.什么时候处理静态路由
			// 2.以什么条件处理
			if(!store.getters['getRole/roles'].length){
				store.dispatch('getRole/axiosGetRole').then(res=>{
					let role = res.role; /* 获取用户的角色值 */
					let button = res.button /* 获取用户的按钮权限 */
					store.dispatch('getRole/createRouter',role).then(res=>{
						let addRouters = store.getters['getRole/addRouters'];
						let allRouters = store.getters['getRole/allRouters'];
						//路由更新
						router.options.routes = allRouters;
						console.log(router.options.routes)
						//添加动态路由
						router.addRoutes(addRouters)
						next({...to,replace:true})
					})
				});
			}else{
		 	 	next()
		 	}
		}
	}else{
		if(to.path === '/login'){
			next()
		}else{
			next('/login')
		}
	}
})