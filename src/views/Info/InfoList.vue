<template>
	<div id="infolist" >
			<el-row :gutter="15">
				<el-col :span="4">
					<div class="label_wrap category">
						<label for="">类型:</label>
						<div class="content">
							<el-select clearable v-model="categoryVal" placeholder="请选择">
								<el-option v-for="(item,index) of InfoCategory"
								:key="item.id" :label="item.category_name" 
								:value="item.id" 
								></el-option>
								
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
										format="yyyy 年 MM 月 dd 日"
										value-format="yyyy-MM-dd HH:mm:ss"
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
							<el-select v-model="keyVal" placeholder="选择">
								<el-option label="标题" value="title"></el-option>
								<el-option label="id" value="id"></el-option>
							</el-select>
						</div>
					</div>
				</el-col>
				<el-col :span="3">
					<el-input clearable v-model="inputVal" size="40px" style="width: 100%;" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="2">
					<el-button style="width:100%;height: 40px;" type="danger" @click="searchInfo">搜索</el-button>
				</el-col>
				<el-col :span="4" style="text-align: right;">
					<el-button style="width:50%;height: 40px;" type="danger" @click="$isDialog('新增')">新增</el-button>
				</el-col>
			</el-row>
		<!-- 表格 -->
		<el-table
		    :data="tableData" @selection-change="checkBox"
		    border  v-loading="loadingTable"
		    style="width: 100%;margin:30px 0;">
				<el-table-column type="selection" width="55"></el-table-column>
		    <el-table-column prop="title" label="标题" width="830px"></el-table-column>
		    <el-table-column prop="categoryId" label="类别" width="130px" :formatter="initCartgoryId"></el-table-column>
		    <el-table-column prop="createDate" label="日期" width="230px" :formatter="initDate"></el-table-column>
				<el-table-column prop="manager" label="管理人" width="115px"></el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope">
					  <el-button size="mini" type="danger" @click="deleteInfo(scope.row.id)">删除</el-button>
					  <el-button size="mini" type="success" @click="$isDialog('编辑',scope.row)">编辑</el-button>
				  </template>
				</el-table-column>
		  </el-table>
			<!-- 分页 -->
			<el-row >
				<el-col :span="12" ><el-button @click="deleteMore" size="medium">批量删除</el-button></el-col>
				<el-col :span="12" style="padding-top:5px;">
					<el-pagination
						style="text-align:right;"
						@current-change="changePage"
						background 
					  layout="prev, pager, next"
					  :total="total">
					</el-pagination>
				</el-col>
			</el-row>
			<dialogEdit :title="title" :row="row" @resetData="getInfoList(currentPage)" :InfoCategory="InfoCategory" :isDialog.sync="isDialog" ></dialogEdit>
	</div>
</template>

<script>
	import {infoCategory,InfoList,deleteInfo} from '@/api/Info.js'
	import dialogEdit from './dailog/dilogEdit.vue'
	import {timestampToTime} from '@/ulits/toDate.js'
	export default{
		name:'InfoList',
		components:{dialogEdit},
		data(){
			return{
				categoryVal:'',dateVal:'',keyVal:'',inputVal:'',total:1,currentPage:1,title:'',row:{},
				//弹出框状态
				isDialog:false,
				//表格加载状态
				loadingTable:false,
				InfoCategory:[],
				tableData: [],
				idArray:[]
			}
		},
		methods:{
			//打开新增弹窗
			$isDialog(title,row){
				if (title === '编辑') this.row = row;
				this.isDialog = true;
				this.title = title;
			},
			
			
			//获取信息分类
			getInfoCategory(){
				infoCategory().then(res=>{
					this.InfoCategory = res.data.data;
					console.log(this.InfoCategory)
				}).catch(err=>{
					console.log(err);
				})
			},
			
			//对获取信息列表接口所需的参数进行重组
			remakeListParam(){
				let {categoryVal,keyVal,dateVal,inputVal} = this;
				let listParam = {
					categoryId:categoryVal
				};
				//关键字
				if(keyVal) listParam[keyVal] = inputVal;
				//开始日期,结束日期
				if(!dateVal){
					return listParam
				}else{
					listParam.startTiem = dateVal[0];
					listParam.endTime = dateVal[1];
					return listParam
				}
			},
			//获取信息列表
			getInfoList(currentPage=1){
				this.loadingTable = true;
				InfoList({
					...this.remakeListParam(),
					pageNumber:currentPage,
					pageSize:10
				}).then(res=>{
					this.tableData = res.data.data.data;
					this.total = res.data.data.total;
					console.log(this.tableData)
					this.loadingTable = false;
				}).catch()
			},
			//搜索信息
			searchInfo(){
				console.log(this.remakeListParam(),this.dateVal)
				this.getInfoList()
			},
			
			//改变页数
			changePage(e){
				this.getInfoList(e)
			},
			
			/* 删除信息............................... */
			
			//封装删除信息函数
			axiosDelete(id){
				this.confirmBox({}).then(()=>{
					deleteInfo({
						id
					}).then((res)=>{
							this.getInfoList(this.currentPage)
							this.idArray = [];
						})
				})
			},
			//删除单个信息
			deleteInfo(id){
					this.axiosDelete([id])
			},
			//选中表格内容,返回选中参数的id数组的方法
			checkBox(data){
				this.idArray = data.map(item=>item.id);
			},
			//删除多个信息
			deleteMore(){
				if(!this.idArray.length){
					this.$message.error('请至少选择一条数据删除')
					return
				}else{
					this.axiosDelete(this.idArray)
				}
			},
			
			/* ....................................................... */
			
			//table的时间戳转时间
			/* 调用一个方法,返回一个新值,替换原始值 */
			initDate(row){
				return timestampToTime(row.createDate);
			},
			// //table的categoryId转categoryName
			initCartgoryId(row){
				let categoryName = this.InfoCategory.filter(item=>item.id == row.categoryId)[0].category_name;
				// let index = this.InfoCategory.findIndex(item=>item.id	 == row.categoryId);
				// let categoryName = this.InfoCategory[index].category_name
				//console.log(categoryName)
				return categoryName
			}
		},
		created(){
			this.getInfoCategory();this.getInfoList()
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
