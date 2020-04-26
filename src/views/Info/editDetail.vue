<template>
	<div id="editDetail">
		<el-form ref="form" :model="infoForm" label-width="86px">
			<el-form-item label="信息分类: ">
					<el-select  clearable v-model="infoForm.categoryVal" placeholder="请选择">
						<el-option v-for="(item,index) of InfoCategory"
						:key="item.id" :label="item.category_name" 
						:value="item.id" 
						></el-option>
					</el-select>
			</el-form-item>
		  <el-form-item label="新闻标题" class="newsTitle">
		    <el-input  clearable v-model="infoForm.titleVal" placeholder="新闻标题"></el-input>
		  </el-form-item>
			<el-form-item label="缩略图" >
			 <uploadImg></uploadImg>
			</el-form-item>
			<el-form-item label="新闻标题" class="editDate">
			  <el-date-picker 
					v-model="infoForm.dateVal"
					type="date" disabled
					placeholder="选择日期"
					format="yyyy-MM-dd"
					value-format="yyyy-MM-dd"	>
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<quillEditor v-model="infoForm.contentVal" ref="myQuillEditor" :options="editorOption"/>
			</el-form-item>
		  <el-form-item>
		    <el-button :loading="submitLoading" type="primary"	@click="onsubmit">查询</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script >
	import {infoCategory,InfoList,editInfo} from '@/api/Info.js'
	import {timestampToTime} from '@/ulits/toDate.js'
	//引入富文本组件
	import { quillEditor } from "vue-quill-editor"; 	import 'quill/dist/quill.core.css';	import 'quill/dist/quill.snow.css';	import 'quill/dist/quill.bubble.css';
	export default{
		name:"EditDetail",
		components:{quillEditor},
		data(){
			return{
				submitLoading:false,
				editorOption:{},
				InfoCategory:[],
				info:{
					id:'',
					title:''
				},
				infoForm: {
          categoryVal: '',
          titleVal: '',
					dateVal:'',
					contentVal:'',
        }
			}
		},
		methods:{
			axiosGetInfo(){
				let {id,title} = this.info;
				InfoList({
					id,
					title,
					pageNumber:1,
					pageSize:10
				}).then(res=>{
					let {categoryId,title,createDate} = res.data.data.data[0];
					this.infoForm.categoryVal = categoryId;
					this.infoForm.titleVal = title;
					this.infoForm.dateVal = timestampToTime(createDate);
				}).catch()
			},
			onsubmit(){
				this.submitLoading = true;
				let {categoryVal,titleVal,dateVal,contentVal} = this.infoForm;
				if(!categoryVal || !titleVal || !contentVal){
					this.$message.error('类型,标题,内容不能为空');
					this.loading = false;
					return ;
				}
				editInfo({
					categoryId:categoryVal,
					title:titleVal,
					content:contentVal,
					id:this.info.id,
					imgUrl:''
				}).then(res=>{
					this.submitLoading = false;
				}).catch(err=>{
				})
			}
		},
		created(){
			/* 获取id,title */
			let {id,title} = this.$store.state.infoParams;
			this.info.id = this.$route.params.id || id;
			this.info.title = this.$route.params.title || title;
			/* 获取分类列表 */
			infoCategory().then(res=>{this.InfoCategory = res.data.data})
			/* 获取信息详情 */
			this.axiosGetInfo()				
		}
	}
</script>

<style lang="scss" scoped>
</style>
