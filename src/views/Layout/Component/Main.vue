<template>
	<div id="Main_wrap">
		<div class="content">
			<keep-alive>
				<!-- 需要缓存 -->
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
			<!-- 不需要缓存 -->
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	#Main_wrap{
		// position: fixed;
		// top: 75px;
		// left: 250px;
		// right: 0;
		// bottom: 0;
		width: 100%;
		height: 100%;
		border-bottom: 0;
		background-color: #fff;
	}
	.content{
		padding: 30px 30px 0 30px;
	}
</style>
