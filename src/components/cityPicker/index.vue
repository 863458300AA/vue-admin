<template>
	<div style="overflow: hidden;">
		<el-row :gutter="10">
			<el-col :span="6">
				<el-select placeholder="请选择" v-model="address.province" @change="axiosGetCity">
					<el-option v-for="item of province"  :key="item.PROVINCE_ID"
					:label="item.PROVINCE_NAME" data-name="item.PROVINCE_NAME" :value="item.PROVINCE_CODE" ></el-option>
				</el-select>
			</el-col>
			<el-col :span="6">
				<el-select placeholder="请选择" v-model="address.city" @change="axiosGetCounty">
					<el-option v-for="item of city"  :key="item.CITY_ID"
					:label="item.CITY_NAME" :value="item.CITY_CODE" ></el-option>
				</el-select>
			</el-col>
			<el-col :span="6">
				<el-select placeholder="请选择" v-model="address.area" @change="axiosGetStreet">
					<el-option v-for="item of area"  :key="item.AREA_ID"
					:label="item.AREA_NAME" :value="item.AREA_CODE"></el-option>
				</el-select>
			</el-col>
			<el-col :span="6">
				<el-select placeholder="请选择" v-model="address.street" >
					<el-option v-for="item of street"  :key="item.STREET_ID"
					:label="item.STREET_NAME" :value="item.STREET_CODE"></el-option>
				</el-select>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {getArea} from '@/api/getArea.js'
	import cityPicker from './cityPicker.js' /* 省份,城市,区,街道的获取 */
	export default{
		name:'cityPicker',
		mixins:[cityPicker],
		props:{
			cityPicker:{
				type:Object,
				default:{}
			}
		},
		data(){
			return{
				address:{
					province:'',
					city:'',
					area:'',
					street:''
				},
			}
		},
		methods:{
			/* 重置地址信息 */
			// initAddress(){
			// 	this.address = Object.assign({},this.cityPicker)
			// 	console.log(this.address)
			// }
		},
		created() {
			console.log(this.cityPicker)
		}
	}
</script>

<style>
</style>
