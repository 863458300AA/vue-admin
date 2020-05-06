import {getArea} from '@/api/getArea.js'
let cityPicker = {
	data(){
		return{
			province:[],city:[],area:[],street:[]
		}
	},
	methods:{
		
		/* 调接口代码 */
		getData(data){
			getArea(data).then(res=>{
				this[data.type]  = res.data.data.data;
			})
		},
		
		/*重置选项*/
		reset(param){
			let resetJson = {
				city:['city','area','street'],
				area:['area','street'],
				street:['street']
			}
			resetJson[param.type].forEach(v=>{
				this.address[v] = ''
			}) 
		},
		
		/* 获取省份 */
		axiosGetProvince(){
			this.getData({type:'province'});
		},
		
		/* 根据省份,获取获取城市 */
		axiosGetCity(val){
			this.reset({type:"city"});
			this.getData({type:"city",province_code:val})
		},
		/* 根据城市,获取区 */
		axiosGetCounty(val){
			this.reset({type:"area"});
			this.getData({type:"area",city_code:val})
		},
		/* 根据区获取街道*/
		axiosGetStreet(val){
			this.reset({type:"street"});
			this.getData({type:"street",area_code:val})
		}
	},
	computed:{
		watchAddress(){
			let {	province,city,area,street} = this.address;
			return {province,city,area,street}
		}
	},
	watch:{
		watchAddress(newV){
			console.log(newV)
			this.$emit('update:cityPicker',newV)
		}
	},
	created(){
		this.axiosGetProvince()
	}
}

export default cityPicker