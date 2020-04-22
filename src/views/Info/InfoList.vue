<template>
	<div id="infolist">
			<el-row :gutter="15">
				<el-col :span="4">
					<div class="label_wrap category">
						<label for="">类型:</label>
						<div class="content">
							<el-select v-model="categoryVal" placeholder="请选择">
								<el-option label="区域一" value="上海"></el-option>
								<el-option label="区域二" value="北京"></el-option>
								<el-option label="区域三" value="广州"></el-option>
							</el-select>
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="label_wrap date">
						<label style="padding-right: 20px;">日期:</label>
						<div class="content">
								<el-date-picker
								    v-model="dateVal"
								    type="datetimerange"
								    align="right"
								    start-placeholder="开始日期"
								    end-placeholder="结束日期"
								    :default-time="['12:00:00', '08:00:00']">
								</el-date-picker>
						</div>
					</div>
				</el-col>
				<el-col :span="3" >
					<div class="label_wrap keyword">
						<label style="padding-right:20px;">关键字:</label>
						<div class="content">
							<el-select v-model="idVal" placeholder="ID">
								<el-option label="1" value="a"></el-option>
								<el-option label="1" value="a"></el-option>
								<el-option label="1" value="a"></el-option>
								<el-option label="1" value="a"></el-option>
							</el-select>
						</div>
					</div>
				</el-col>
				<el-col :span="3">
					<el-input size="40px" style="width: 100%;" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="2">
					<el-button style="width:100%;height: 40px;" type="danger">搜索</el-button>
				</el-col>
				<el-col :span="4" style="text-align: right;">
					<el-button style="width:50%;height: 40px;" type="danger" @click="isDialog=true">新增</el-button>
				</el-col>
			</el-row>
		<!-- 表格 -->
		<el-table
		    :data="tableData"
		    border
		    style="width: 100%;margin:30px 0;">
				<el-table-column type="selection" width="55"></el-table-column>
		    <el-table-column prop="title" label="标题" width="830px"></el-table-column>
		    <el-table-column prop="category" label="类别" width="130px"></el-table-column>
		    <el-table-column prop="date" label="日期" width="230px"></el-table-column>
				<el-table-column prop="manager" label="管理人" width="115px"></el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope">
					  <el-button size="mini" type="danger" @click="deleteMore()">删除</el-button>
					  <el-button size="mini" type="success" @click="isDialog=true">编辑</el-button>
				  </template>
				</el-table-column>
		  </el-table>
			<!-- 分页 -->
			<el-row >
				<el-col :span="12" ><el-button @click="deleteInfo()" size="medium">批量删除</el-button></el-col>
				<el-col :span="12" style="padding-top:5px;">
					<el-pagination
						style="text-align:right;"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						background
					  layout="prev, pager, next"
					  :total="1000">
					</el-pagination>
				</el-col>
			</el-row>
			<dialogEdit :isDialog.sync="isDialog" ></dialogEdit>
	</div>
</template>

<script>
	import dialogEdit from './dailog/dilogEdit.vue'
	export default{
		name:'InfoList',
		components:{dialogEdit},
		data(){
			return{
				//下拉选择框数据
				categoryVal:'',dateVal:'',idVal:'',
				//弹出框状态
				isDialog:false,
				tableData: [
					{
						title:'安徽省点解啊还是',
						category:'国内信息',	
						date: '2016-05-02',	
						manager: '管理员',
					}, 
					{
						title:'安徽省点解啊还是',
						category:'国内信息',	
						date: '2016-05-02',	
						manager: '管理员',
					}, 
					{
						title:'安徽省点解啊还是',
						category:'国内信息',	
						date: '2016-05-02',	
						manager: '管理员',
					}, 
					{
						title:'安徽省点解啊还是',
						category:'国内信息',	
						date: '2016-05-02',	
						manager: '管理员',
					}
			]
			}
		},
		methods:{
			handleCurrentChange(e){
				console.log(e)
			},
			handleSizeChange(e){
				console.log(e)
			},
			deleteInfo(){
				this.confirmBox({
				}).then(res=>{
					this.$message.success('成功删除')
				})
			},
			deleteMore(){
				this.confirmBox({
				}).then(res=>{
					this.$message.success('成功删除')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  "../../styles/config.scss";
		.label_wrap{
			&.category{@include labelDom (left,60px,40px)}
			&.date{@include labelDom (right,93px,40px)}
			&.keyword{@include labelDom (right,99px,40px)}
		}
</style>
