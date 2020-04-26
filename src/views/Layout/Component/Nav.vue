<template>
	<div id="nav_wrap">
		<div class="img" :class="{close:isCollapse}">
			<img src="../../../assets/vue_03.png" alt="">
		</div>
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
		:collapse="isCollapse"
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
				   <el-menu-item v-if="!subItem.hidden" v-for="(subItem,index) of item.children" :key="index" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
				</el-submenu>
			</template>
		</el-menu>
	</div>
</template>

<script>
	export default{
		name:'navMenu',
		data(){
			return{
				routers:[],
			}
		},
		computed:{
			isCollapse(){
				return this.$store.state.app.isCollapse
			}
		},
		methods:{
			
		},
		mounted(){
			this.routers = this.$router.options.routes;
		}
}
</script>

<style lang="scss" scoped>
	@import '../../../styles/config.scss';
	#nav_wrap{
		height: 100vh;
		// width: 250px;
		background-color: #344a5f;
	}
	.img{
		position: absolute;
		padding-top: 40px;
		left: $navMenu/2 - 45;
		@include webkit(transition,all .3s ease 0s)
		img{
			width: 90px;
			height: 80px;
		}
	&.close{
		left: 0;
		margin-left: 0;
	}
	}
	.el-menu-vertical-demo{
		padding-top: 140px;
	}
</style>
