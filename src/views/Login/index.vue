<template>
	<div class="login">
	  <div class="login_wrap">
		  <ul @click="change" class="menu_tab">
		  	<li data-index="0" :class="{current:0 == currentIndex}">登录</li>
		  	<li data-index="1" :class="{current:1 == currentIndex}">注册</li>
		  </ul>
			<el-form size="medium" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
			  
				<el-form-item  prop="userName" class="from-item">
					<label for="">邮箱</label>
			    <el-input type="text" v-model="ruleForm.userName" autocomplete="off" clearable ></el-input>
			  </el-form-item>
			  
				<el-form-item  prop="password" class="from-item">
					<label for="">密码</label>
			    <el-input mixlength="6" maxlength="20" type="password" v-model="ruleForm.password" autocomplete="off" clearable></el-input>
			  </el-form-item>
			  
				<el-form-item v-show="currentIndex==1" prop="againPassword" class="from-item">
					<label for="">重复密码</label>
				  <el-input mixlength="6" maxlength="20" type="password" v-model="ruleForm.againPassword" autocomplete="off" clearable></el-input>
				</el-form-item>
				
				<el-form-item  prop="code" class="from-item">
					<label for="">验证码</label>
					<el-row :gutter="11">
					  <el-col :span="15" ><el-input mixlength="6" maxlength="6" v-model="ruleForm.code" clearable></el-input></el-col>
					  <el-col :span="9" ><el-button class="block" type="success">获取验证码</el-button></el-col>
					</el-row>
			  </el-form-item>
			  
				<el-form-item>
			    <el-button class="block margin-top-19" type="danger" @click="submitForm('ruleForm')">提交</el-button>
			  </el-form-item>
			</el-form>
			</div>
	  </div>
	</div>
</template>

<script>
	import {stripscript,regUserName,regCode,regPassword} from '@/ulits/validate.js'
	export default{
			data(){
				//验证邮箱
				var validateUserName = (rule, value, callback) => {
				  if (value === '') {
				  callback(new Error('请输入用户名'));
				  } else if(!regUserName(value)){
							callback(new Error('用户名格式有误'));
					} else {
							callback(); //true
					}
				};
				//验证密码
				var validatePassWord = (rule, value, callback) => {
				  if (value === '') {
				    callback(new Error('请输入密码'));
				  } else if(this.currentIndex){
						if (!regPassword(value)) {
						  callback(new Error('密码位6-20位数字或密码组成'));
						} else {
						  callback();
						}
					}else{
						callback();
					}
					
				};
				//当用户选择注册时,要重复输入密码
				var validateAgainPassWord = (rule, value, callback) => {
					if(!this.currentIndex){
						callback();
						return
					}
					console.log(1)
				  if (value === '') {
				    callback(new Error('请再次输入密码'));
				  } else if (value !== this.ruleForm.password) {
				    callback(new Error('密码不相同'));
				  } else {
				    callback();
					}
				};
				//验证码校验
				var checkCode = (rule, value, callback) => {
					if (value === '') {
					  callback(new Error('请输入验证码'));
					} else if (!regCode(value)) {
					  callback(new Error('验证码格式错误'));
					} else {
					  callback();
					}
				};
				return{
					currentIndex:0,
					ruleForm: {
						userName: '',
						password: '',
						againPassword:'',
						code: ''
					},
					rules: {
						userName: [
							{ validator:validateUserName, trigger: 'blur' }
						],
						password: [
							{ validator:validatePassWord, trigger: 'blur' }
						],
						againPassword: [
							{ validator:validateAgainPassWord, trigger: 'blur' }
						],
						code: [
							{ validator:checkCode, trigger: 'blur' }
						]
					}
				}
		},
		methods:{
			change(e){
				let {index} = e.target.dataset;
				this.currentIndex = index;
				this.ruleForm = {
						userName: '',
						password: '',
						againPassword:'',
						code: ''
					}
			},
			submitForm(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
			      alert('submit!');
			    } else {
			      console.log('error submit!!');
			      return false;
			    }
			    });
			}
		}
	}
</script>

<style scoped lang="scss">
	.login{
		background-color: #344a5f;
		height: 100vh;
	}
	.login_wrap{
		width:330px;
		margin: auto;
		color:#fff;
	}
	.menu_tab{
		text-align: center;
		li{
		  display: inline-block;
		  width: 88px;
			font-size: 18px;
		  line-height:36px ;
		  cursor: pointer;
			color: #fff;
		}
		.current{
			background-color:rgba(0,0,0, 0.1);
		}
	}
	.login-form{
		margin-top: 29px;
		label{
			color: #EEEEEE;
			font-size: 14px;
			display: block;
			margin-bottom: 3px;
		}
		.from-item{
			margin-bottom: 13px;
		}
	}
	.block{
		display: block;
		width: 100%;
		text-align: center;
	}
	.margin-top-19{
		margin-top: 19px;
	}
</style>
