<template>
	<el-dialog
	  title="新增"
	  :visible.sync="dialogEdit"
	  width="580px" left @close="close()">
	  <el-form ref="form" :model="form" :label-width="labelWidth">
			<el-form-item label="类型 :">
			  <el-select v-model="form.region" placeholder="请选择活动区域">
			    <el-option label="区域一" value="shanghai"></el-option>
			    <el-option label="区域二" value="beijing"></el-option>
			  </el-select>
			</el-form-item>
	    <el-form-item label="标题 :">
	      <el-input v-model="form.name" placeholder="请输入内容"></el-input>
	    </el-form-item>
			<el-form-item label="概况 :">
			  <el-input type="textarea" placeholder="请输入内容" v-model="form.name"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
		  <el-button @click="centerDialogVisible = false">取 消</el-button>
		  <el-button type="danger" @click="centerDialogVisible = false">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default{
		name:'dialogEdit',
		data(){
			return{
				dialogEdit:false,
				labelWidth:'60px',
				form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
			}
		},
		props:{
			isDialog:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			close(){
				this.$emit('update:isDialog',false)
			}
		},
		watch:{
			isDialog(newV,oldV){
					this.dialogEdit = newV
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>

