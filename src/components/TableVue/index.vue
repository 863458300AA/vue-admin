<template>
	<div>
		<el-table	border :data="tableData" @selection-change="selectionChange">
			<el-table-column v-if="tableConfig.selection" type="selection" width="55"></el-table-column>
			<template v-for="(item,index) of tableConfig.tableHead" >
				<!-- 插槽 -->
				<el-table-column :key="index" v-if="item.columnType === 'slot'" :label='item.label'>
					<template slot-scope="scope">
						<slot :data="scope.row"  :name="item.slotName"></slot>
					</template>
				</el-table-column>
				<el-table-column :key="index" v-else :prop="item.prop" :label='item.label'></el-table-column>
			</template>
		</el-table>
		<div class="table-footer">
			<el-row>
				<el-col :span="17">
					<slot name="tableFooterLeft"></slot>
				</el-col>
				<el-col :span="7">
					<el-pagination
						style="text-align:right;"
						@current-change="changePage"
						background
					  layout="prev, pager, next"
					  :total="total">
					</el-pagination>
				</el-col>
			</el-row>
		</div>
		
	</div>
</template>

<script>
	import tableloadData from './tableLoadData.js' /* 获取用户列表的逻辑 */
	import pagination from './pagination.js' /* 根据页码获取用户列表的逻辑 */
	import Bus from '@/ulits/bus.js' 
	export default{
		name:'tableVue',
		mixins:[tableloadData,pagination],
		data(){
			return{
				tableConfig:{
					tableHead:{},
					selection:false,
					requestData:{}
				},
				tableData:[],
			}
		},
		props:{
			config:{
				type:Object,
				default:{}
			},
			tableSelect:{
				type:Object,
				default:{}
			}
		},
		methods:{
			/* 初始话Tbale配置项 */
			initTableConfig(){
				for(let key in this.config){
					this.tableConfig[key] = this.config[key];
				}
			},
			/* 勾选选项时触发 */
			selectionChange(val){
				let selectionData = {
					idItem:val.map(item=>item.id)
				}
				this.$emit('update:tableSelect',selectionData)
			}
		},
		beforeMount(){
			this.initTableConfig()
			Bus.$on('getUserList',this.axiosUserList)
		}
	}
</script>

<style lang="scss" scoped>
	.table-footer{
		margin-top: 30px;
	}
</style>
