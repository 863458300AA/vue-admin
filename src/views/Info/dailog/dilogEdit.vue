<template>
	<el-dialog
	  :title="title"
	  :visible.sync="dialogEdit"
	  width="580px" left 
		:close-on-click-modal="false"
		@open="open"
		@close="close()">
	  <el-form ref="form" :model="infoform" :label-width="labelWidth">
			<el-form-item label="类型 :" prop="category">
			  <el-select v-model="infoform.category" placeholder="请选择类型">
					<el-option v-for="(item,index) of InfoCategory"
					:key="item.id" :label="item.category_name" 
					:value="item.id" 
					></el-option>
			  </el-select>
			</el-form-item>
	    <el-form-item label="标题 :" prop="title">
	      <el-input v-model="infoform.title" placeholder="请输入内容"></el-input>
	    </el-form-item>
			<el-form-item label="概况 :" prop="content">
			  <el-input type="textarea" placeholder="请输入内容" v-model="infoform.content"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
		  <el-button @click="close">取 消</el-button>
		  <el-button type="danger" :loading="loading" @click="add_edit()">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {addInfo,editInfo} from '@/api/Info.js'
	export default{
		name:'dialogEdit',
		data(){
			return{
				dialogEdit:false,
				loading:false,
				labelWidth:'60px',id:'',imgUrl:'',saveRow:{},
				infoform: {
          category:'',
					title:'',
					content:''
        }
			}
		},
		props:{
			isDialog:{
				type:Boolean,
				default:false
			},
			InfoCategory:{
				type:Array,
				default:[]
			},
			title:{
				type:String,
				default:''
			},
			row:{
				type:Object,
				default:{}
			}
		},
		methods:{
			//关闭  弹框
			close(){
				this.$emit('update:isDialog',false)
				//this.clearFrom()
				this.$refs['form'].resetFields();
			},
			//当弹窗打开时
			open(){
				if(this.title === '编辑'){
					let { categoryId:category,title,content,id,imgUrl} = this.row;
					this.infoform.category = category;
					this.infoform.title = title;
					this.infoform.content = content;
					this.id = id;
					this.imgUrl = imgUrl;
				}
			},
			/* ................................................................ */
			
			//重置为初始状态
			_initInfo(){
				this.$emit('resetData','')/* 刷新表格 */
				this.$emit('update:isDialog',false) /*关闭表格*/
				this.loading = false;
				this.$refs['form'].resetFields();
			},
			//增加信息
			add_edit(){
				this.loading = true;
				let {category,title,content} = this.infoform;
				if(!category || !title || !content){
					this.$message.error('类型,标题,内容不能为空');
					this.loading = false;
					return ;
				}
				if(this.title === '新增'){
					console.log(this.infoform)
					addInfo(this.infoform).then(res=>{
						this._initInfo()
					}).catch(err=>{
						this.loading = false;
					})
				}else{
					editInfo({
						categoryId:category,
						title,
						content,
						id:this.id,
						imgUrl:this.imgUrl
					}).then(res=>{
						this._initInfo()
					}).catch(err=>{
						this.loading = false;
					})
				}
				
			},
			
			/* ................................................................ */
			
			//清除input的值
			// clearFrom(){
			// 	this.infoform.category = '';
			// 	this.infoform.title = '';
			// 	this.infoform.content = '';
			// }
		},
		watch:{
			isDialog(newV,oldV){
				this.dialogEdit = newV
			}
		},
		created(){
			console.log(111)
		}
	}
</script>

<style lang="scss" scoped>
</style>

