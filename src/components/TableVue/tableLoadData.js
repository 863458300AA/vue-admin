import {getTableData} from '@/api/requestUrl.js'
let tableloadData = {
	data(){
		return{
			total:0
		}
	},
	
	created(){
		//this.axiosUserList()
	},
	
	mounted(){this.axiosUserList()},
	
	methods:{
		axiosUserList(params){
			/* 浅克隆 */
			let requestData = JSON.parse(JSON.stringify(this.tableConfig.requestData));
			/* 搜索时触发以下逻辑 */
			if(params){
				for(let key in params){
					requestData.data[key] = params[key];
				}
				requestData.data.pageNumber = 1
				requestData.data.pageSize = 10
			}
			console.log(requestData.data)
			getTableData(requestData).then(res=>{
				this.tableData = res.data.data.data;
				this.total = !this.tableData.length? 0:res.data.data.total;
			})
		},
	}
}

export default tableloadData