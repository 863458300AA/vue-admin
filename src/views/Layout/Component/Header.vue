<template>
	<div id="header_wrap">
		<div class="pull_left" @click="setCollapse()"><i class="iconfont icon-san"></i></div>
		<div class="user_info ">
			<div class="avatar"></div>
			<div class="level">{{username}}</div>
			<div ><i @click="switchOff()" class="iconfont icon-guanji"></i></div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"LayoutHeader",
		computed:{
			username(){
				console.log(this.$store)
				return this.$store.state.app.username
			}
		},
		methods:{
			setCollapse(){
				this.$store.commit('app/SET_COLLAPSE');
			},
			switchOff(){
				this.$confirm('退出页面并注销用户?',{
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  center: true
				}).then(() => {
				    this.$router.push('/login')
				  }).catch(() => {
							return
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../styles/config.scss';
	#header_wrap{
		display: flex;
		justify-content: space-between;
		// position: fixed;
		// left: 250px;
		// right: 0;
		// height: 75px;
		// z-index: 2;
		height: 100%;
		background-color: #FFFFFF;
		@include webkit(box-shadow,0 3px 16px 0 rgba(0,0,0,.1))
	}
	.iconfont{
		font-size: 22px;	
		line-height: 75px;
		cursor: pointer;
	}
	.pull_left{
		margin-left:32px;
	}
	.user_info{
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 75px;
		margin-right: 29px;
		.avatar{
			width: 36px;
			height: 36px;
			border-radius: 50%;
			background-color: #000000;
			cursor: pointer;
		}
		.level{
			font-size: 14px;
			color: #252525;
			padding: 0 22px 0 18px;
			margin-right: 28px;
			border-right: 1px solid #ededed;
		}
	}
</style>
