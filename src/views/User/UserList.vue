<template>
	<div>
		<el-row >
			<el-col :span="22">
				<div class="label_wrap">
					<label for="">关键字: </label>
					<div class="content">
						<el-row :gutter="12">
							<el-col :span="3">
								<el-select clearable v-model="key" placeholder="请选择">
									<el-option label="姓名" value="truename"></el-option>
									<el-option label="电话" value="phone"></el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
								<el-input v-model="keyword" placeholder="请输入关键字"></el-input>
							</el-col>
							<el-col :span="16">
								<el-button @click="search" type="danger" v-if="btnPremi('user:search')">搜索</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
			</el-col>
			<el-col :span="2">
				<el-button type="danger" @click="$isDialog()" v-if="btnPremi('user:add')">新增用户</el-button>
			</el-col>
		</el-row>
			<TableVue style="padding:30px 0;" ref="useTable" :config="tableConfig" :tableSelect.sync="tableSelect">
				<template v-slot:status="data">
					<div>
						<el-switch v-model="data.data.status"
						 active-value="2" inactive-value="1" @change="handleSwitch(data.data)"
						 active-color="#13ce66"  inactive-color="#ff4949"
						 ></el-switch>
					</div>
				</template>
				<template v-slot:options="data">
					<el-button @click="deleteOneUser(data.data.id)" size="mini" type="danger" v-if="btnPremi('user:del')">删除</el-button>
					<el-button size="mini" @click="$isDialog('编辑',data.data)" type="success" v-if="btnPremi('user:edit')">编辑</el-button>
				</template>
				<template #tableFooterLeft>
					<el-button @click="deleteMore" size="small" v-if="btnPremi('user:batchDel')">批量删除</el-button>
				</template>
			</TableVue>
		<Dialog :isDialog.sync="isDialog" :userData="userData" :title="title"></Dialog>
	</div>
</template>

<script>
	import TableVue from '../../components/TableVue/index.vue'
	import Dialog from './dailog/index.vue'
	import {delUser,userStatus} from '@/api/requestUrl.js'
	import Bus from '@/ulits/bus.js'
	export default{
		name:'UserList',
		components:{TableVue,Dialog},
		data(){
			return{
				isDialog:false,isDisabled:false,
				key:'',keyword:'',time:null,total:10,title:'',
				userData:{},
				tableConfig:{
					selection:true,
					requestData:{
						url:'/user/getList/',
						method:'post',
						data:{
							username:"",
							truename:"",
							phone:"",
							pageNumber:1,
							pageSize:10
						}
					},
					tableHead:[
						{
							prop:'username',
							label:'邮箱/用户户名',
						},
						{
							prop:'truename',
							label:'真实姓名',
						},
						{
							prop:'phone',
							label:'手机号',
						},
						{
							prop:'area',
							label:'地区',
						},
						{
							prop:'role',
							label:'角色',
						},
						{
							label:'禁启用状态',
							columnType:'slot',
							slotName:'status'
						},
						{
							label:'操作',
							columnType:'slot',
							slotName:'options'
						}
					],
				},
				tableSelect:{}
			}
		},
		methods:{
			//改变用户禁启用状态时触发
			handleSwitch(val){
				if (this.time) {
					clearTimeout(this.time)
				}
				this.time = setTimeout(()=>{
					let {id,status} = val;
					userStatus({
						id,
						status
					}).then(res=>{console.log(res)})
				},300)
			},
			
			/* 打开新增或编辑用户窗口时触发 */
			$isDialog(title='新增',params){
				this.isDialog = true;
				this.title = title;
				if(title === '编辑') this.userData = params;
			},
			
			/* 调用删除接口 */
			axiosDelUser(id){
				this.confirmBox({}).then(res=>{
					delUser({id}).then(res=>{
						this.$refs.useTable.axiosUserList();
					}).catch()
				})
			},
			/* 删除多个用户时触发 */
			deleteMore(){
				console.log(this.$refs.useTable);
				let id = this.tableSelect.idItem;
				if(!id || id.length === 0){
					this.$message.error('请选择要删除的用户')
					return
				}
				this.axiosDelUser(id)
			},
			/* 删除单个用户时触发 */
			deleteOneUser(id){
			  id = [id]
				this.axiosDelUser(id)
			},
			/* 搜索时调用 */
			search(){
				let params = {
					[this.key]:this.keyword
				}
				this.$refs.useTable.axiosUserList(params)
			}
		},
		/* 销毁定时器 */
		destroyed() {
			clearTimeout(this.time)
		},
	}
</script>
<style lang="scss" scoped>
		@import  "../../styles/config.scss";
		.label_wrap{
			@include labelDom (left,75px,40px)
		}
</style>