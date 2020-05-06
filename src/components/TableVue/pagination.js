let pagination = {
	data(){
		return{
		}
	},
	
	created(){},
	
	mounted(){},
	
	methods:{
		changePage(e){
			this.tableConfig.requestData.data.pageNumber = e;
			this.axiosUserList()
		}
		
	},
}
export default pagination
