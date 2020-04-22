import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './router/routeGuard.js'
import tipsBox from '@/ulits/globalFun.js'

//全局注册
Vue.use(ElementUI)
Vue.use(tipsBox)
Vue.config.productionTip = false

console.log(Vue.prototype)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
