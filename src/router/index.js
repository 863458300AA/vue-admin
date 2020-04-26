import Vue from 'vue'
import Router from 'vue-router' 
const Layout = () => import('../views/Layout/index.vue')
Vue.use(Router)

  const routes = [
  {
    path: '/',
		redirect:'login',
		meta:{
			name:'主页'
		}
  },
  {
    path: '/login',
    name: 'Login',
		meta:{
			name:'登录'
		},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ()=>import ('../views/Login/index.vue')
  },
	
	/*
	 控制台选项 
	 */
	
	{
	  path: '/console',
	  name: 'Console',
		redirect:'index',
		hidden:true,
		meta:{
			name:'控制台',
			icon:'icon-yibiaopan'
		},
	  // route level code-splitting
	  // this generates a separate chunk (about.[hash].js) for this route
	  // which is lazy-loaded when the route is visited.
	  component: Layout,
		children:[
			{
				path: '/index',
				name: 'Index',
				meta:{
					name:'首页'
				},
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import('../views/Console/index.vue'),
			},
		]
	},
	
	/* 
	信息管理选项 
	*/
	{
	  path: '/info',
	  name: 'Info',
		hidden:true,
		meta:{
			name:'信息管理',
			icon:'icon-xinxiguanli'
		},
	  // route level code-splitting
	  // this generates a separate chunk (about.[hash].js) for this route
	  // which is lazy-loaded when the route is visited.
	  component: Layout,
		children:[
			{
				path: '/infoList',
				name: 'InfoList',
				meta:{
					name:'信息列表'
				},
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import('../views/Info/InfoList.vue'),
			},
			{
				path: '/infoCategory',
				name: 'InfoCategory',
				meta:{
					name:'信息分类'
				},
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import('../views/Info/InfoCategory.vue'),
			},
			{
				path: '/editDetail',
				name: 'EditDetail',
				hidden:true,
				meta:{
					name:'信息详情'
				},
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import('../views/Info/editDetail.vue'),
			}
		]
	},
	/* 
	用户管理 
	*/
	{
	  path: '/user',
	  name: 'User',
		hidden:true,
		meta:{
			name:'用户管理',
			icon:'icon-yonghuguanli'
		},
	  // route level code-splitting
	  // this generates a separate chunk (about.[hash].js) for this route
	  // which is lazy-loaded when the route is visited.
	  component: Layout,
		children:[
			{
				path: '/userList',
				name: 'UserList',
				meta:{
					name:'用户列表'
				},
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import('../views/User/UserList.vue'),
			}
		]
	}
	
]

const router = new Router({
  routes
})

export default router
