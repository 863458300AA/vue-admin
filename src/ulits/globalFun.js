import { MessageBox } from 'element-ui';

export default{
	install(Vue,options){
			Vue.prototype.confirmBox = function({text='确定要删除吗',type='warning',tips='警告',confirmButtonClass='danger'}){
				return MessageBox.confirm(text, tips, {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								center:true,
								type,
								confirmButtonClass
							 })
			}
	}
}

