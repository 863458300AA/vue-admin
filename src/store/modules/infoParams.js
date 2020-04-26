const state = {
	id:'' || JSON.parse(sessionStorage.getItem('infoId')),
	title:'' || JSON.parse(sessionStorage.getItem('infoTitle'))
}

const getters = {
	test:state=>state
}

const	mutations = {
	SET_INFODETAIL(state,params){
		for(var key in params){
			state[key] = params[key].value;
			if(params[key].isSession){
				//html5 本地储存
				sessionStorage.setItem(params[key].sessionKey,JSON.stringify(params[key].value));
			}
		}
	}
}
		
const	actions = {
}

export default {
	namespaced:true,
	state,
	mutations,
	actions,
	getters
};