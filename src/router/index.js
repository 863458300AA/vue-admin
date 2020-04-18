import Vue from 'vue'
import Router from 'vue-router' 

Vue.use(Router)

  const routes = [
  {
    path: '/',
	redirect:'login'
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/index.vue')
  }
]

const router = new Router({
  routes
})

export default router
