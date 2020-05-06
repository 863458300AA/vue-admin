import {regUserName,regPassword} from '@/ulits/regLogin.js'
import sha1 from 'js-sha1'
import {addUser,editUser} from '@/api/requestUrl.js'
import Bus from '@/ulits/bus.js'
let validator = {
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
		var validateRole= (rule, value, callback) => {
		  if (!value.length) {
		    callback(new Error('请选择系统'));
		  } else{ 
				callback();
			}
		};
		return{
			rules: {
				username: [
					{ validator:validateUserName, trigger: 'blur' }
				],
				password: [
					{ validator:validatePassWord, trigger: 'blur' }
				],
				role: [
					{ validator:validateRole, trigger: 'blur' }
				],
			}
		}
	},
	
	created(){},
	
	mounted(){
		
	},
	
	methods:{
		/* 调用接口成功后触发 */
		_initDialog(){
			this.loading = false; /* 关闭按钮等待状态 */
			this._initInfo() /*弹窗组件初始化*/
			Bus.$emit('getUserList') /*重新加载表格*/
		},
		/* 新增用户时调用的接口 */
		axiosaddUser(requestData){
			requestData.password = sha1(requestData.password)
			console.log(requestData)
			addUser(requestData).then(res=>{
				this._initDialog()
			}).catch(err=>{
				this.loading = false; /* 关闭按钮等待状态 */
			})
		},
		/* 编辑用户时调用的接口 */
		axiosEditUser(requestData){
			delete requestData.password;
			console.log(requestData)
			editUser(requestData).then(res=>{
				this._initDialog()
			}).catch(err=>{
				this.loading = false; /* 关闭按钮等待状态 */
			})
		},
		//提交时触发
		submitForm(formName) {
		  this.$refs[formName].validate((valid) => {
		    if (valid) {
					let requestData = Object.assign({},this.userForm)
					requestData.role = requestData.role.join() /* role值转为字符串 */
					requestData.btnPerm = requestData.btnPerm.join() /*btnPerm值转为字符串 */;
					requestData.region = JSON.stringify(this.cityPicker)
					this.loading = true;
					if(this.title === '新增'){
						this.axiosaddUser(requestData)
					}else{
						//编辑
						this.axiosEditUser(requestData)
						delete this.userForm.id; //删除id
					}
		    } else {
		      return false;
					}
		  });
		},
	},
}

export default validator

