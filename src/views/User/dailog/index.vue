<template>
	<el-dialog
		class="useDialog"
	  :title="title"
	  :visible.sync="dialogEdit"
	  width="580px" left 
		:close-on-click-modal="false"
		@open="open"
		@close="close">
	  <el-form ref="form" :rules="rules" :model="userForm" :label-width="labelWidth">
			<el-form-item label="用户名 :" prop="username">
				<el-input placeholder="请输入内容邮箱/用户名" v-model="userForm.username"></el-input>
			</el-form-item>
			<el-form-item v-if="title === '新增'" label="密码 :" prop="password">
			  <el-input type="password" v-model="userForm.password" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item label="姓名 :" prop="truename">
			  <el-input v-model="userForm.truename" placeholder="请输入真实姓名"></el-input>
			</el-form-item>
			<el-form-item label="电话 :" prop="phone">
			  <el-input  placeholder="请输入电话" v-model="userForm.phone"></el-input>
			</el-form-item>
			<el-form-item label="地区 :" prop="region">
				<CityVue ref="cityPicker" :cityPicker.sync="cityPicker"></CityVue>
			</el-form-item>
			<el-form-item label="是否启用:" >
				<el-radio-group v-model="userForm.status" size="small">
					<el-radio label="1" >禁用</el-radio>
					<el-radio label="2" >启用</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="系统:" prop="role">
				<el-checkbox-group  v-model="userForm.role" size="small">
					<el-checkbox v-for="(item,index) of systemVal" 
					:label="item.role" :key="index"
					>{{item.name}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="按钮权限:" prop="btnPerm">
				<template v-if="btnVal.length > 0">
					<div v-for="(item,index) of btnVal" :key="index">
						<h4>{{item.name}}</h4>
						<template v-if="item.perm.length> 0 && item.perm">
							<el-checkbox-group v-model="userForm.btnPerm" size="small">
								<el-checkbox v-for="(elem,index) of item.perm" 
								:label="elem.value" :key="elem.value"
								>{{elem.name}}</el-checkbox>
							</el-checkbox-group>
						</template>
					</div>
				</template>
				
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button 	@click="close" >取消</el-button>
			<el-button  :loading="loading" @click="submitForm('form')" type='danger'>确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import CityVue from '../../../components/cityPicker/index.vue'
	import validator from './validator.js'
	import {getSystem,getBtnPre} from '@/api/requestUrl.js'
	export default{
		name:'userDialog',
		components:{CityVue},
		mixins:[validator],
		data(){
			return{
				dialogEdit:false,
				loading:false,
				labelWidth:'80px',id:'',imgUrl:'',
				systemVal:[],btnVal:[],
				cityPicker:{},
				userForm: {
          username:'',
					truename:'',
					password:'',
					phone:'',
					region:'',
					status:'1',
					role:[],
					btnPerm:[]
        }
			}
		},
		props:{
			isDialog:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:''
			},
			userData:{
				type:Object,
				default:{}
			}
		},
		methods:{
			/* 获取系统值 */
			axiosGetSystem(){
				getSystem().then(res=>{
					this.systemVal = res.data.data
				})
			},
			
			/* 获取分配按钮权限值 */
			axiosGetBtnPre(){
				getBtnPre().then(res=>{
					this.btnVal = res.data.data
				})
			},
			//关闭  弹框
			close(){
				this._initInfo()
			},
			/* 地址组件初始化 */
			_initAddress(){
				let address = this.$refs.cityPicker.address
				for(let key in address){
					address[key] = ''
				}
			},
			//当弹窗打开时
			open(){
				if(this.title === '编辑'){
					let userData = Object.assign({},this.userData);
					userData.role = userData.role.split(','); //字符串转数组
					userData.btnPerm = userData.btnPerm.split(',');
					for(let key in userData){
							this.userForm[key] = userData[key]
					}
			  }
			 if(this.title === '新增' && this.userForm.username){
					console.log(this.userForm)
					for(let key in this.userForm){
						if(this.userForm[key] instanceof Array){
							this.userForm[key] = [];
						}else{
							this.userForm[key] = '';
						}
					}
					this.userForm.status = '1'
					console.log(this.userForm)
				}
			},
			/* ................................................................ */
			
			//重置为初始状态
			_initInfo(){
				this.$emit('update:isDialog',false) /*关闭表格*/
				this.$refs['form'].resetFields(); /* 清空输入框的内容 */
				this._initAddress() /* 清空地址 */
			},
			/* ................................................................ */
		},
		watch:{
			isDialog(newV,oldV){
				this.dialogEdit = newV
			}
		},
		created(){
			if(!this.systemVal.length) this.axiosGetSystem();
			if(!this.btnVal.length) this.axiosGetBtnPre();
		}
	}
</script>

<style lang="scss" scoped>
</style>

