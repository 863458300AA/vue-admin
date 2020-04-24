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
			next()
		}else{
			next()
		}
		//路透动态添加,分配菜单,每个角色分配不同的菜单
	}else{
		if(to.path === '/login'){
			next()
		}else{
			next('/login')
		}
	}
})