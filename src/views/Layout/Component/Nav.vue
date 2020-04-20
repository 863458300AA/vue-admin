<template>
	<div id="nav_wrap">
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
		@open="handleOpen" @close="handleClose" 
	  background-color="transparent" router
		text-color="#fff" active-text-color="#fff">
			<template v-for="(item,index) of routers">
				<el-submenu v-if="item.hidden" :index="index + '' " :key="index">
				<!-- 一级菜单 -->
				  <template slot="title">
				    <i class="iconfont" :class="item.meta.icon" style="padding-right: 15px;font-size: 18px;color: #fff;"></i>
				    <span slot="title">{{item.meta.name}}</span>
				  </template>
					<!-- 子菜单 -->
				   <el-menu-item v-for="(subItem,index) of item.children" :key="index" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
				</el-submenu>
			</template>
		</el-menu>
		<div @click="test()">{{count}}</div>
	</div>
</template>

<script>
	export default{
		name:'navMenu',
		data(){
			return{
				routers:[],
				a:10
			}
		},
		methods:{
			handleOpen(key, keyPath) {
			  console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
			  console.log(key, keyPath);
		  },
			test(){
				console.log(1)
				this.a+=10;
			}
		},
		computed:{
			count(){
				console.log(2)
				return this.a*10
			}
		},
		mounted(){
			this.routers = this.$router.options.routes;
			console.log(this.routers)
		}
}
</script>

<style lang="scss" scoped>
	@import '../../../styles/config.scss';
	#nav_wrap{
		// position: fixed;
		height: 100vh;
		// width: 250px;
		background-color: #344a5f;
	}
</style>
