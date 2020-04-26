<template>
	<div id="infoCategory">
		<el-button @click="openParent" type="danger">添加一级分类</el-button>
		<div style="background-color:#e9e9e9;margin:30px 0 30px -30px;height:1px;width:calc(100% + 60px);"></div>
		<el-row :gutter="30">
			<el-col :span="8" class="category">
				<div v-for="(item,index) of category" :key="item.id">
					<h4 class="flexBetween">
						<div>
							<i class="iconfont icon-jiahao"></i><span v-text="item.category_name"></span>
						</div>
						<div class="btnGroup">
							<el-button round size="mini" type="danger" @click="editCategory(item)">编辑</el-button>
							<el-button round size="mini" type="success" @click="addChildren(item)">添加子级</el-button>
							<el-button round size="mini" @click="delParent(item.id)">删除</el-button>
						</div>
					</h4>
					<ul >
						<li class="flexBetween" v-for="elem of item.children">
							{{elem.category_name}}
							<div class="btnGroup">
								<el-button round size="mini" type="danger" @click="editChild(item,elem)">编辑</el-button>
								<el-button round size="mini" @click="deletaChild(elem.id,index)">删除</el-button>
							</div>
						</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="16" v-show="showAddParent" class="edit">
				<h4 style="padding-left: 22px;margin-bottom: 28px;background-color: #f3f3f3;">分类编辑</h4>
				<el-form label-position="left" ref="categoryForm" :model="form" label-width="142px">
				  <el-form-item v-show="showAddParent"  label="一级分类名称:">
				    <el-input :disabled="parentDisabled" v-model="form.parentCategory"></el-input>
				  </el-form-item>
					<el-form-item v-show="showAddChild" label="二级分类名称:">
					  <el-input v-model="form.childCategory"></el-input>
					</el-form-item>
					<el-form-item>
					  <el-button :loading="loading" type="danger" 
						@click="onSubmit()" v-text="onsubmitText"></el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {infoCategory,addFirstCategory,deleteCategory,editCategory,addChildrenCategory} from '@/api/Info.js'
	export default{
		name:'InfoCategory',
		data(){
			return{
					showAddParent:false,showAddChild:false,parentDisabled:false,loading:false,
					onsubmitText:'添加',
					CategoryId:'',
					// childId:'',
				  form:{	parentCategory:'', childCategory:''	},
					category:[]
      }
		},
		methods:{
			//添加一级分类
			openParent(){
				this.parentDisabled = false;
				this.showAddParent = true;
				this.showAddChild = false;
				this.onsubmitText = '添加';
				this.form.childCategory = '';
			},
			
			//编辑一级分类
			editCategory(param){
				this.onsubmitText = '编辑';
				this.parentDisabled = false;
				this.showAddChild = false;
				this.samePart(param);
			},
			
			//添加子级分类
			addChildren(param){
				this.onsubmitText = '添加';
				this.showAddChild = true;
				this.parentDisabled = true
				this.samePart(param)
				this.form.childCategory = '';
			},
			
			//编辑二级分类(
			editChild(parent,child){
				this.addChildren(parent);
				this.form.childCategory = child.category_name;
				this.CategoryId = child.id;
				this.onsubmitText = '编辑'
			},
			//相同部分
			samePart(param){
				this.showAddParent = true; /*展示分类编辑部分*/
				this.form.parentCategory = param.category_name; /* 将值给到一级分类的输入框 */
				this.CategoryId = param.id; /* 把对应的一级分类ID给到全局的变量中 */
			},
			
			//删除分类
			deleteCategory(categoryId){
				return	this.confirmBox({})
								.then(res=>{
									deleteCategory({categoryId})
								})
			},
			//删除一级分类
			delParent(categoryId){
				this.deleteCategory(categoryId)
				.then(()=>{
						// 删除数组中的第一种方法
						// let index = this.category.findIndex((item)=>item.id == categoryId)
						// this.category.splice(index,1)
						// 删除数组元素第二种
						this.category = this.category.filter((item)=>item.id != categoryId);
						
					}).catch();	
			},
			//删除二级分类
			deletaChild(childID,index){
				this.deleteCategory(childID)
				.then((res)=>{
						let children = this.category[index].children
						this.category[index].children = children.filter(v=> v.id != childID);
					}).catch();
			},
			
			//触发submit事件(调用接口)
			onSubmit(){
				let {parentCategory,childCategory} = this.form;
				if (!parentCategory.trim()) {
					this.$message.error('一级分类名称不能为空');
					return;
				}else{	this.loading = true;	}
				//编辑分类
				if(this.onsubmitText === '编辑'){
					if(!childCategory){
						this.axiosEditParent(parentCategory);
					}else{
						this.axiosEditParent(childCategory)
					}
				}else{//添加分类
					
					// 二级分类没有显示,就证明是添加一级分类的操作,
					if(!this.showAddChild){
						this.axiosAddParent(parentCategory);
						return
					}
					
					// 添加二级分类 
					if(childCategory){
						this.axiosAddChild(childCategory);
					}else{
						this.$message.error('二级分类名称不能为空');
						return
					}
				}
			},
			
			// 调用获取分类接口
			axiosGetCategory(){
				infoCategory().then(res=>{
					this.category = res.data.data;	
				}).catch(err=>{
					console.log(err);
				})
			},
			//调用 编辑分类接口
			axiosEditParent(parentCategory){
				editCategory({
					id:this.CategoryId,
					categoryName:parentCategory
				}).then(res=>{
					let {parentCategory,childCategory} = this.form;
					if(parentCategory && !childCategory){
						//编辑一级分类
						let {categoryName} = res.data.data.data,
						index = this.category.findIndex(item=>item.id == this.CategoryId);
						this.category[index].category_name = categoryName;
						this._initCategory('parentCategory');
						this.showAddParent = false;
					}else{
						//编辑二级分类
						this.axiosGetCategory();
						this._initCategory('parentCategory');
						this.showAddParent = false;
					}
					}).catch(err=>{
							this._initCategory('childCategory');
						});
			},
			//调用 添加一级分类接口
			axiosAddParent(parentCategory){
				addFirstCategory({
					categoryName:parentCategory
				}).then(res=>{
					this.category.push(res.data.data)
					this._initCategory('parentCategory');
					}).catch(err=>{
							this._initCategory('parentCategory');
						})
			},
			//调用 添加二级分类接口
			axiosAddChild(childCategory){
				addChildrenCategory({
					parentId:this.CategoryId,
					categoryName:childCategory
				}).then(res=>{
					let index = this.category.findIndex(item=>item.id == this.CategoryId);
					let child = res.data.data;
					child.parent_id = this.CategoryId;
					if(!this.category[index].children){
						this.category[index].children = [];
					}
						this.category[index].children.push(child)
						this._initCategory('childCategory');
					})
			},
			//调用增加或修改分类接口后,重置变量
			_initCategory(Category){
				this.loading = false;
				this.form[Category] = '';
			},
		},
		created() {
			infoCategory().then(res=>{
				this.category = res.data.data
			})
		}
	}
</script>

<style lang="scss" scoped>
	@import  "@/styles/config.scss";
	.category,.edit{
		line-height: 44px;
	}
	.category{
		ul{
			position: relative;
			&:before{
				content: '';
				display: block;
				position: absolute;
				top: -15px;
				left: 18px;
				height:calc(100% + 29px);
				border-left: 1px dashed #000;
			}
		}
		>div:last-child ul{
			&:before{
				height:calc(100% - 6px);
			}
		}
		h4{
			font-weight: 700;
			i{
				padding:0 12px 0 13px;
				font-size: 14px;
			}
		}
		li{
			position: relative;
			margin-left: 20px;
			padding-left: 40px;
			//border-left: 1px dashed #000;
			&::before{
				content: '';
				display: block;
				position: absolute;
				left: 1px;
				top: 22px;
				width: 32px;
				border: 0.5px dashed #000;
			}
		}
		li,h4{
			@include webkit(transition,all .5s ease 0s);
			&:hover{
				background-color: #f3f3f3;
				.btnGroup{
					display: block;
				}
			}
		}
	}
	.flexBetween{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.btnGroup{
		display: none;
		button{
			margin: 0;
			margin-right:8px;
		}
	}
</style>
