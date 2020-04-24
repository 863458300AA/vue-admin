<template>
	<div class="login">
	  <div class="login_wrap">
		  <ul @click="change" class="menu_tab">
		  	<li  data-index="0" :class="{current:0 == currentIndex}">登录</li>
		  	<li  data-index="1" :class="{current:1 == currentIndex}">注册</li>
		  </ul>
			<el-form size="medium" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
			  
				<el-form-item  prop="username" class="from-item">
					<label for="">邮箱</label>
			    <el-input type="text" v-model="ruleForm.username" autocomplete="off" clearable ></el-input>
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
					  <el-col :span="9" >
							<el-button 
								@click="getmess()" class="block" type="success" 
								v-text="codeStatus.text" :disabled="codeStatus.status"></el-button>
						</el-col>
					</el-row>
			  </el-form-item>
			  
				<el-form-item>
			    <el-button 
					 class="block margin-top-19" 
					 type="danger" 
					 :disabled="submitBtnStatus"
					 @click="submitForm('ruleForm')" 
					 v-text="currentIndex === '1'? '注册':'登录'"></el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {getSms,Register,Login} from '../../api/login.js'
	import {stripscript,regUserName,regCode,regPassword} from '@/ulits/validate.js'
	import sha1 from 'js-sha1'
	export default{
		name:'login',
		data(){
				//验证邮箱
				var validateUserName = (rule, value, callback) => {
				  if (value === '') {
				  callback(new Error('请输入用户名'));
				  } else if(!regUserName(value)){
							this.userNameStatus = false
							callback(new Error('用户名格式有误'));
					} else {
							this.userNameStatus = true;
							callback();
							 //true
					}
				};
				//验证密码
				var validatePassWord = (rule, value, callback) => {
				  if (value === '') {
				    callback(new Error('请输入密码'));
				  } else if(this.currentIndex === '1'){
						if (!regPassword(value)) {
						  callback(new Error('密码由6-20位数字或密码组成'));
						} else {
						  callback();
						}
					}else{
						callback();
					}
					
				};
				//当用户选择注册时,要重复输入密码;选择登录时,直接使这项的验证为TRUE
				var validateAgainPassWord = (rule, value, callback) => {
					if(this.currentIndex === '0'){
						callback();
						return
					}
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
					currentIndex:'0',
					userNameStatus:false,
					codeStatus:{
						status:false,
						text:'发送验证码'
					},
					submitBtnStatus:true,
					timer:null,
					ruleForm: {
						username: '',
						password: '',
						againPassword:'',
						code: ''
					},
					rules: {
						username: [
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
				this.resetCode()
			},
			//进行验证码的重置
			resetCode(){
				this.codeStatus.status = false;
				this.codeStatus.text = '获取验证码';
				clearInterval(this.timer);
				this.$refs['ruleForm'].resetFields();
			},
			
			//注册提交
			registerSubmit(username,password,code){
				Register({
					username,
					password:sha1(password),
					code
				}).then(res=>{
					this.currentIndex = '0';
					this.resetCode()
				}).catch(err=>{
					console.log(err);
				})
			},
			
			//登陆提交
			loginSubmit(username,password,code){
				this.$store.dispatch('app/login',{
					username,
					password:sha1(password),
					code
				}).then(res=>{
					this.$router.push({
						name:'Console'
					})
				}).catch(err=>{
					console.log(err	);
				})
			},
			//进行提交
			submitForm(formName) {
				console.log(this.currentIndex)
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
						let {username,password,code} = this.ruleForm;
						this.currentIndex === '0'? this.loginSubmit(username,password,code):this.registerSubmit(username,password,code);
			    } else {
			      return false;
						}
			    });
			},
			//验证码倒计时函数
			countDown(){
				let time = 60;
				this.timer = setInterval(()=>{
					time--;
					if(!time){
						this.codeStatus.status = false;
						this.codeStatus.text = '再次获取';
						clearInterval(this.timer);
					}else{
						this.codeStatus.text = time + 's';
					}
				},1000)
			},
			//获取验证码
			getmess(){
				let {username} = this.ruleForm;
				let module = this.currentIndex == '0'? 'login':'register';
				if(!username){
					 this.$message({
					  message: '用户名不能为空哦~',
					  type: 'error',
						duration:1500
					});
					return;
				}
				if(!this.userNameStatus){
				
					return;
				}
				//对应的提交按钮变为可点击
				this.submitBtnStatus = false;
				this.codeStatus.status = true;
				this.codeStatus.text = '发送中';
				getSms({
					username:this.ruleForm.username,
					module
				}).then(res=>{
					this.countDown()
				}).catch(err=>{
				})
			}
		},
		mounted(){
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
