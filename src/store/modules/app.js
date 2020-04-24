import {Login} from '../../api/login.js'
import {setToken,setUserName,getUsername} from '../../ulits/cookieSetting.js'

const state = {
	isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) || false,
	token:'',
	username:getUsername() || ''
};
const getters = {
	isCollapse:state=>state.isCollapse,
	username:state=>state.username
}
const	mutations = {
	SET_COLLAPSE(state){
		state.isCollapse = !state.isCollapse;
		//html5 本地储存
		sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
	},
	SET_TOKEN(state,token){
		state.token = token;
	},
	SET_USERNAME(state,username){
		state.username = username;
	}
};
		
const	actions = {
	login({commit},requestData){
	  return new Promise((resolve,reject)=>{
			Login(requestData).then(res=>{
				resolve(res)
				let {token,username} = res.data.data;
				//把相关的值通过mutation对象存进vuex中
				
				commit('SET_TOKEN',token);
				commit('SET_USERNAME',username);
				
				//把相关的值存进cookie中
				setToken(token);
				setUserName(username)
			}).catch(err=>{
				reject(err)
			})
		})
	}
};

export default {
	namespaced:true,
	state,
	mutations,
	actions,
	getters
};