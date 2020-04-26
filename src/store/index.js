import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app.js'
import login from './modules/login.js'
import infoParams from './modules/infoParams.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
		app,
		login,
		infoParams
  }
})
