<template>
	<div id="layout">
		<el-container direction="horizontal">
			<!-- 侧边导航栏 -->
			<el-aside :width="setWidth"><Nav></Nav></el-aside>
			<el-container>
				<!-- 头部 -->
				<el-header height="75px"><Header></Header></el-header>
				<!-- 主题内容区域 -->
				<el-main><Main></Main></el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import Header from './Component/Header.vue'
	import Nav from './Component/Nav.vue'
	import Main from './Component/Main.vue'
	export default{
		name:'Layout',
		components:{Header,Nav,Main},
		computed:{
			setWidth(){
				let status = this.$store.state.app.isCollapse;
				return status? '64px' : '250px';
			}
		},
		mounted(){
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/config.scss';
	#layout{
		background-color: #f7f7f7;
		//@include webkit(transition,all .3s ease 0s)
	}
	.el-aside{
		@include webkit(transition,all .3s ease 0s)
	}
	.el-main{
		padding:30px 30px 0 30px
	}
</style>
