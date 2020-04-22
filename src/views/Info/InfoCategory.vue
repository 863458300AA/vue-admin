<template>
	<div id="infoCategory">
		<el-button type="danger">添加一级分类</el-button>
		<div style="background-color:#e9e9e9;margin:30px 0 30px -30px;height:1px;width:calc(100% + 60px);"></div>
		<el-row :gutter="30">
			<el-col :span="8" class="category">
				<div class="categoryNews">
					<h4 class="flexBetween">
						<div>
							<i class="iconfont icon-jianhao"></i><span>新闻</span>
						</div>
						<div class="btnGroup">
							<el-button round size="mini" type="danger">编辑</el-button>
							<el-button round size="mini" type="success">添加子级</el-button>
							<el-button round size="mini" >删除</el-button>
						</div>
					</h4>
					<ul >
						<li class="flexBetween">
							国内
							<div class="btnGroup">
								<el-button round size="mini" type="danger">编辑</el-button>
								<el-button round size="mini" >删除</el-button>
							</div>
						</li>
						<li>国内</li>
						<li>国内</li>
						<li>国内</li>
						<li>国内</li>
						<li>国内</li>
					</ul>
				</div>
				<div class="categoryKeji">
					<h4>
						<div>
							<i class="iconfont icon-jiahao"></i><span>科技</span>
						</div>
					</h4>
					<ul >
						<li>国内</li>
						<li>国内</li>
						<li>国内</li>
						<li>国内</li>
						<li>国内</li>
						<li>国内</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="16" class="edit">
				<h4 style="padding-left: 22px;margin-bottom: 28px;background-color: #f3f3f3;">一级分类编辑</h4>
				<el-form label-position="left" ref="form" :model="form" label-width="142px">
				  <el-form-item label="一级分类名称:">
				    <el-input v-model="form.one"></el-input>
				  </el-form-item>
					<el-form-item label="二级分类名称:">
					  <el-input v-model="form.two"></el-input>
					</el-form-item>
					<el-form-item>
					  <el-button type="danger" @click="onSubmit">确定</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		name:'InfoCategory',
		data(){
			return{
				  form: {
						one: '',
						two:''
        }
      }
		}
	}
</script>

<style lang="scss" scoped>
	@import  "@/styles/config.scss";
	.category,.edit{
		line-height: 44px;
	}
	.category{
		h4{
			font-weight: 700;
			i{
				padding:0 12px 0 13px;
				font-size: 14px;
			}
		}
		ul{
			position: relative;
			&:before{
				content: '';
				display: block;
				position: absolute;
				left: 19px;
				top: -15px;
				width: 0px;
				height: 300px;
				border: 0.5px dashed #000;
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
