<template>
	<div class="uploadImg">
		<el-upload
		  class="avatar-uploader"
		  action="https://jsonplaceholder.typicode.com/posts/"
		  :show-file-list="false"
		  :on-success="handleAvatarSuccess"
		  :before-upload="beforeAvatarUpload">
		  <img v-if="imgUrl" :src="imgUrl" class="avatar">
		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
</template>

<script>
 export default{
	 name:"UploadImg",
	 data(){
		 return{
			 imgUrl:''
		 }
	 },
	 methods:{
		 /* 图片上传方法 */
		 handleAvatarSuccess(res, file) {
		   this.imageUrl = URL.createObjectURL(file.raw);
		 },
		 beforeAvatarUpload(file) {
		   const isJPG = file.type === 'image/jpeg';
		   const isLt2M = file.size / 1024 / 1024 < 2;
		 
		   if (!isJPG) {
		     this.$message.error('上传头像图片只能是 JPG 格式!');
		   }
		   if (!isLt2M) {
		     this.$message.error('上传头像图片大小不能超过 2MB!');
		   }
		   return isJPG && isLt2M;
		 }
	 }
 }
</script>

<style lang="scss" scoped>
	
</style>
